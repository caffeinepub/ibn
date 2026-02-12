import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Array "mo:core/Array";

import Stripe "stripe/stripe";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import OutCall "http-outcalls/outcall";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles
  public type UserProfile = {
    name : Text;
    phone : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Stripe integration
  var configuration : ?Stripe.StripeConfiguration = null;
  let sessionOwners = Map.empty<Text, Principal>();

  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    switch (sessionOwners.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?owner) {
        if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check your own payment sessions");
        };
      };
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create checkout sessions");
    };
    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
    sessionOwners.add(sessionId, caller);
    sessionId;
  };

  public type DataPlan = {
    id : Text;
    title : Text;
    priceInCents : Nat;
  };

  var nextPlanId = 0;
  let dataPlans = Map.empty<Text, DataPlan>();

  public query func highestToLowestPrice() : async [Text] {
    ["NEW;10", "LOVE_ALL;7", "STUDENT;4", "LOVE_ALL;3", "SUPER_VAT;3"];
  };

  public shared ({ caller }) func addDataPlan(title : Text, priceInCents : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add data plans");
    };
    let newPlan : DataPlan = {
      id = nextPlanId.toText();
      title;
      priceInCents;
    };
    nextPlanId += 1;
    dataPlans.add(newPlan.id, newPlan);
  };

  public query func getDataPlan(id : Text) : async ?DataPlan {
    dataPlans.get(id);
  };

  public query func getAllDataPlans() : async [DataPlan] {
    dataPlans.values().toArray();
  };

  public shared ({ caller }) func createSinglePlanCheckoutSession(planId : Text, successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create checkout sessions");
    };

    let plan = switch (dataPlans.get(planId)) {
      case (null) { Runtime.trap("Data plan not found") };
      case (?plan) { plan };
    };

    let items = [{ plan with currency = "EUR"; productName = plan.title; productDescription = plan.title; quantity = 1 }];
    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
    sessionOwners.add(sessionId, caller);
    sessionId;
  };

  // Bank transfer details (supporting multiple accounts)
  public type BankDetails = {
    bankName : Text;
    accountName : Text;
    accountNumber : Text;
    note : ?Text;
    iban : ?Text;
    bic : ?Text;
  };

  var bankAccounts : [var BankDetails] = [
    {
      bankName = "OPAY";
      accountName = "USMAN UMAR";
      accountNumber = "9033449260";
      note = null;
      iban = null;
      bic = null;
    },
    {
      bankName = "MONIE POINT";
      accountName = "USMAN UMAR";
      accountNumber = "9033449260";
      note = null;
      iban = null;
      bic = null;
    },
    {
      bankName = "POLARIS BANK";
      accountName = "USMAN UMAR";
      accountNumber = "3028545600";
      note = null;
      iban = null;
      bic = null;
    },
  ].toVarArray<BankDetails>();

  public shared ({ caller }) func saveBankAccounts(accounts : [BankDetails]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can save bank accounts");
    };
    bankAccounts := accounts.toVarArray();
  };

  public query ({ caller }) func getBankAccounts() : async [BankDetails] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view bank accounts");
    };
    bankAccounts.toArray();
  };
};
