import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VILLAS } from "@/data/villas";
import { useActor } from "@/hooks/useActor";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = ["Booking Summary", "Guest Details", "Payment"];

export default function Booking() {
  const { id } = useParams({ from: "/booking/$id" });
  const villa = VILLAS.find((v) => v.id === id);
  const { actor } = useActor();
  const [step, setStep] = useState(0);
  const [checkin] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
  );
  const [checkout] = useState(
    new Date(Date.now() + 10 * 86400000).toISOString().split("T")[0],
  );
  const [guests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!villa)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Villa Not Found
          </h2>
          <Link to="/villas" className="text-gold hover:underline">
            Browse All Villas
          </Link>
        </div>
      </div>
    );

  const nights = Math.floor(
    (new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000,
  );
  const subtotal = nights * villa.price;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  const handlePayment = async () => {
    if (!actor) {
      toast.error("Please log in to complete your booking.");
      return;
    }
    setIsLoading(true);
    try {
      const url = await actor.createCheckoutSession(
        [
          {
            productName: villa.name,
            currency: "inr",
            quantity: BigInt(1),
            priceInCents: BigInt(total * 100),
            productDescription: `${nights} nights at ${villa.name}`,
          },
        ],
        `${window.location.origin}/booking/${id}?success=true`,
        `${window.location.origin}/booking/${id}?cancelled=true`,
      );
      window.location.href = url;
    } catch {
      toast.error("Payment setup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <Link
            to="/villas/$id"
            params={{ id }}
            data-ocid="booking.link"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Villa
          </Link>
          <h1 className="font-serif text-3xl font-bold">
            Complete Your Booking
          </h1>
        </div>

        {/* Step Progress */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                type="button"
                data-ocid="booking.tab"
                onClick={() => i < step && setStep(i)}
                className="flex items-center gap-2 cursor-default"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-gold text-primary-foreground"
                      : i === step
                        ? "bg-gold text-primary-foreground ring-4 ring-gold/30"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    i === step
                      ? "text-foreground"
                      : i < step
                        ? "text-gold"
                        : "text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 w-12 sm:w-20 transition-colors ${
                    i < step ? "bg-gold" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Steps */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Summary */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ ease: EASE, duration: 0.4 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                    <h2 className="font-serif text-xl font-bold mb-5">
                      Booking Summary
                    </h2>
                    <div className="flex gap-4 mb-6">
                      <img
                        src={villa.image}
                        alt={villa.name}
                        className="w-28 h-20 object-cover rounded-xl shrink-0"
                      />
                      <div>
                        <h3 className="font-serif text-lg font-bold">
                          {villa.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {villa.city}, {villa.location}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                            <span key={k} className="text-gold text-xs">
                              ★
                            </span>
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {villa.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-5 border-y border-border text-center">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                          Check In
                        </p>
                        <p className="font-semibold text-sm">
                          {new Date(checkin).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                          Check Out
                        </p>
                        <p className="font-semibold text-sm">
                          {new Date(checkout).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                          Guests
                        </p>
                        <p className="font-semibold text-sm">{guests}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-ocid="booking.primary_button"
                    onClick={() => setStep(1)}
                    className="w-full py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Continue to Guest Details{" "}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Step 1: Guest Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ ease: EASE, duration: 0.4 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                    <h2 className="font-serif text-xl font-bold mb-5">
                      Guest Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                          Full Name
                        </Label>
                        <Input
                          data-ocid="booking.input"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Your full name"
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                          Email
                        </Label>
                        <Input
                          data-ocid="booking.input"
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                          Phone
                        </Label>
                        <Input
                          data-ocid="booking.input"
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                          Special Requests
                        </Label>
                        <Textarea
                          data-ocid="booking.textarea"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="Early check-in, dietary requirements, special occasions..."
                          rows={3}
                          className="bg-background border-border resize-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      data-ocid="booking.cancel_button"
                      onClick={() => setStep(0)}
                      className="flex-1 py-4 border border-border text-foreground/70 font-bold text-sm tracking-widest uppercase rounded-xl hover:border-gold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      data-ocid="booking.primary_button"
                      onClick={() => {
                        if (!guestName || !guestEmail) {
                          toast.error("Please fill required fields.");
                          return;
                        }
                        setStep(2);
                      }}
                      className="flex-1 py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      Continue to Payment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ ease: EASE, duration: 0.4 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                    <h2 className="font-serif text-xl font-bold mb-5">
                      Payment
                    </h2>
                    <div className="p-4 bg-gold/10 border border-gold/20 rounded-xl mb-5">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        You'll be redirected to our secure Stripe payment page.
                        Your card details are never stored on our servers.
                      </p>
                    </div>
                    <div className="space-y-2 mb-5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">{villa.name}</span>
                        <span>{nights} nights</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Rate</span>
                        <span>₹{villa.price.toLocaleString()}/night</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Subtotal</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">GST (18%)</span>
                        <span>₹{taxes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base pt-3 border-t border-border">
                        <span>Total Amount</span>
                        <span className="text-gold">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      data-ocid="booking.cancel_button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-border text-foreground/70 font-bold text-sm tracking-widest uppercase rounded-xl hover:border-gold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      data-ocid="booking.submit_button"
                      onClick={handlePayment}
                      disabled={isLoading}
                      className="flex-1 py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isLoading
                        ? "Processing..."
                        : `Pay ₹${total.toLocaleString()}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-serif text-lg font-bold mb-4">
                Price Summary
              </h3>
              <img
                src={villa.image}
                alt={villa.name}
                className="w-full aspect-[16/10] object-cover rounded-xl mb-4"
              />
              <p className="font-semibold text-sm mb-1">{villa.name}</p>
              <p className="text-xs text-muted-foreground mb-4">
                {villa.city}, {villa.location}
              </p>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-foreground/70">
                    ₹{villa.price.toLocaleString()} × {nights} nights
                  </span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Taxes & fees</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
