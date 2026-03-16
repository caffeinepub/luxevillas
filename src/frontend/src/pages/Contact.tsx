import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
  }),
};

const INFO_CARDS = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email Us",
    value: "hello@luxevillas.in",
    sub: "We respond within 2 hours",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sun, 9am–9pm IST",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Visit Us",
    value: "14 Marine Lines, Mumbai",
    sub: "400002, Maharashtra",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Office Hours",
    value: "Mon–Fri 9am–7pm",
    sub: "Weekend support available",
  },
];

const OFFICES = [
  { city: "Mumbai", address: "14 Marine Lines, Fort, Mumbai 400002" },
  { city: "Delhi", address: "B-47 Connaught Place, New Delhi 110001" },
  { city: "Bangalore", address: "12 MG Road, Bangalore 560001" },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    toast.success("Message sent! We'll get back to you within 2 hours.");
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 bg-card">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-serif text-5xl lg:text-6xl font-bold mb-6"
          >
            Contact <span className="text-gold italic">Us</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-foreground/60 text-lg max-w-lg mx-auto"
          >
            Have a question, want a custom quote, or simply want to say hello?
            We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="p-5 bg-card border border-border rounded-xl text-center group hover:border-gold/40 transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-3 text-gold">
                {card.icon}
              </div>
              <p className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground mb-1">
                {card.label}
              </p>
              <p className="text-sm font-semibold mb-0.5">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-serif text-2xl font-bold mb-6">
                Send a Message
              </h2>
              <form
                data-ocid="contact.panel"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      data-ocid="contact.input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Email *
                    </Label>
                    <Input
                      data-ocid="contact.input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Phone
                    </Label>
                    <Input
                      data-ocid="contact.input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Subject
                    </Label>
                    <Input
                      data-ocid="contact.input"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    data-ocid="contact.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="bg-background border-border resize-none"
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={sending}
                  className="w-full py-4 gold-gradient text-primary-foreground font-bold text-sm tracking-widest uppercase rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Office Locations */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="lg:col-span-2"
          >
            <h2 className="font-serif text-2xl font-bold mb-6">Our Offices</h2>
            <div className="space-y-4 mb-8">
              {OFFICES.map((o, i) => (
                <div
                  key={o.city}
                  data-ocid={`contact.item.${i + 1}`}
                  className="p-5 bg-card border border-border rounded-xl flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{o.city}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {o.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="h-52 rounded-xl overflow-hidden border border-border bg-gradient-to-br from-[#1a3a2a] to-[#0f2020] relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 30px, oklch(1 0 0 / 0.2) 30px, oklch(1 0 0 / 0.2) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, oklch(1 0 0 / 0.2) 30px, oklch(1 0 0 / 0.2) 31px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm font-semibold">
                    Mumbai, Delhi, Bangalore
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
