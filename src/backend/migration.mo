import Map "mo:core/Map";

module {
  type Tag = { id : Text; name : Text; color : Text };
  type Contributor = { id : Text; name : Text; role : Text };
  type Comment = { id : Text; author : Text; content : Text; timestamp : Int };
  type OutlineSection = { id : Text; title : Text; description : Text };
  type Character = { id : Text; name : Text; description : Text; motivations : Text };
  type Plot = { id : Text; title : Text; description : Text; resolution : Text };
  type Idea = { id : Text; content : Text; importance : Int };
  type Objective = { id : Text; description : Text; priority : Int };
  type Location = { id : Text; name : Text; description : Text; significance : Text };
  type StoryElement = { id : Text; title : Text; description : Text };
  type Lesson = { id : Text; description : Text; relevance : Text };
  type StoryPoint = { id : Text; title : Text; impact : Int };
  type Resource = { id : Text; title : Text; description : Text; link : Text };
  type MediaReference = { id : Text; title : Text; type_ : Text; url : Text };
  type BackstoryEvent = { id : Text; description : Text; impact : Text };
  type AlternateEnding = { id : Text; description : Text; author : Text };
  type PaymentDetails = { amount : Nat; currency : Text; stripeSessionId : Text; paymentStatus : Text };

  type OldActor = {};

  public func run(old : OldActor) : {} {
    {};
  };
};
