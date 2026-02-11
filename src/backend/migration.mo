import Array "mo:core/Array";

module {
  type BankDetails = {
    bankName : Text;
    accountName : Text;
    accountNumber : Text;
    note : ?Text;
    iban : ?Text;
    bic : ?Text;
  };

  type OldActor = {
    bankDetails : ?BankDetails;
  };

  public func run(old : OldActor) : { bankAccounts : [var BankDetails] } {
    let bankAccounts = switch (old.bankDetails) {
      case (null) { [].toVarArray<BankDetails>() };
      case (?details) { [details].toVarArray<BankDetails>() };
    };
    { bankAccounts };
  };
};
