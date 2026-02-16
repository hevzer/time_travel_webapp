import { ConfirmationDetails } from "@/components/booking/confirmation-details";
import { Suspense } from "react";

export default function ConfirmationPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
      <Suspense fallback={<div className="text-sm text-muted">Chargement de votre confirmation...</div>}>
        <ConfirmationDetails />
      </Suspense>
    </section>
  );
}
