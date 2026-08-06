import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="flex flex-col gap-[96px] py-12 md:py-24 max-w-5xl mx-auto px-4 md:px-8 w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-4">Get in touch</h2>
          <p className="text-muted-foreground mb-8">Fill out the form and we'll get back to you shortly.</p>
          <div className="flex flex-col gap-4 text-sm">
            <p><strong>Email:</strong> hello@teridox.com</p>
            <p><strong>Location:</strong> Bali, Indonesia</p>
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold block mb-2">Name</label>
            <Input placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-bold block mb-2">Email</label>
            <Input placeholder="john@example.com" type="email" />
          </div>
          <div>
            <label className="text-sm font-bold block mb-2">Message</label>
            <Textarea placeholder="How can we help you?" rows={5} />
          </div>
          <Button className="mt-4 w-full md:w-auto self-start">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
