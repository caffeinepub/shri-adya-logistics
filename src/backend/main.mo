import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactForm {
    public func compare(form1 : ContactForm, form2 : ContactForm) : Order.Order {
      switch (Int.compare(form2.timestamp, form1.timestamp)) {
        case (#equal) { Text.compare(form1.email, form2.email) };
        case (order) { order };
      };
    };
  };

  let contactForms = List.empty<ContactForm>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    if (name.size() == 0 or email.size() == 0 or message.size() == 0) {
      Runtime.trap("All form fields must be non-empty");
    };

    let timestamp = Time.now();
    let contactForm : ContactForm = {
      name;
      email;
      message;
      timestamp;
    };

    contactForms.add(contactForm);
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    contactForms.toArray().sort();
  };
};
