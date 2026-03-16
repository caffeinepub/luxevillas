import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import OutCall "http-outcalls/outcall";
import Migration "migration";
import Runtime "mo:core/Runtime";

(with migration = Migration.run)
actor {
  // Prefab components
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data types
  public type Tag = {
    id : Text;
    name : Text;
    color : Text;
  };

  public type Narrative = {
    id : Text;
    title : Text;
    content : Text;
    publishDate : ?Int;
    coverImage : ?Storage.ExternalBlob;
    author : Principal;
    tags : [Tag];
    isPublished : Bool;
    publishDateOpt : ?Int;
    contributors : [Contributor];
    comments : [Comment];
    outline : [OutlineSection];
    characters : [Character];
    plots : [Plot];
    ideas : [Idea];
    objectives : [Objective];
    locations : [Location];
    storyElements : [StoryElement];
    lessonsLearned : [Lesson];
    storyPoints : [StoryPoint];
    resources : [Resource];
    mediaReferences : [MediaReference];
    backstory : [BackstoryEvent];
    alternateEndings : [AlternateEnding];
    paymentDetails : ?PaymentDetails;
  };

  public type Contributor = {
    id : Text;
    name : Text;
    role : Text;
  };

  public type Comment = {
    id : Text;
    author : Text;
    content : Text;
    timestamp : Int;
  };

  public type OutlineSection = {
    id : Text;
    title : Text;
    description : Text;
  };

  public type Character = {
    id : Text;
    name : Text;
    description : Text;
    motivations : Text;
  };

  public type Plot = {
    id : Text;
    title : Text;
    description : Text;
    resolution : Text;
  };

  public type Idea = {
    id : Text;
    content : Text;
    importance : Int;
  };

  public type Objective = {
    id : Text;
    description : Text;
    priority : Int;
  };

  public type Location = {
    id : Text;
    name : Text;
    description : Text;
    significance : Text;
  };

  public type StoryElement = {
    id : Text;
    title : Text;
    description : Text;
  };

  public type Lesson = {
    id : Text;
    description : Text;
    relevance : Text;
  };

  public type StoryPoint = {
    id : Text;
    title : Text;
    impact : Int;
  };

  public type Resource = {
    id : Text;
    title : Text;
    description : Text;
    link : Text;
  };

  public type MediaReference = {
    id : Text;
    title : Text;
    type_ : Text;
    url : Text;
  };

  public type BackstoryEvent = {
    id : Text;
    description : Text;
    impact : Text;
  };

  public type AlternateEnding = {
    id : Text;
    description : Text;
    author : Text;
  };

  public type PaymentDetails = {
    amount : Nat;
    currency : Text;
    stripeSessionId : Text;
    paymentStatus : Text;
  };

  // Storage maps
  let tags = Map.empty<Text, Tag>();
  let narratives = Map.empty<Text, Narrative>();
  let contributors = Map.empty<Text, Contributor>();
  let comments = Map.empty<Text, Comment>();
  let outlineSections = Map.empty<Text, OutlineSection>();
  let characters = Map.empty<Text, Character>();
  let plots = Map.empty<Text, Plot>();
  let ideas = Map.empty<Text, Idea>();
  let objectives = Map.empty<Text, Objective>();
  let locations = Map.empty<Text, Location>();
  let storyElements = Map.empty<Text, StoryElement>();
  let lessons = Map.empty<Text, Lesson>();
  let storyPoints = Map.empty<Text, StoryPoint>();
  let resources = Map.empty<Text, Resource>();
  let mediaReferences = Map.empty<Text, MediaReference>();
  let backstoryEvents = Map.empty<Text, BackstoryEvent>();
  let alternateEndings = Map.empty<Text, AlternateEnding>();
  let commentsByNarrative = Map.empty<Text, [Comment]>();
  let narrativeLikes = Map.empty<Text, [Principal]>();

  // Stripe integration
  var configuration : ?Stripe.StripeConfiguration = null;

  public query ({ caller }) func getCallerUserProfile() : async Text {
    "replace with correct implementation"
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async Text {
    "replace with correct implementation";
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Text) : async () {
    Runtime.trap("replace with correct implementation");
  };

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

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
