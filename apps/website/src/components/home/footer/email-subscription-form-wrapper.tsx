import { subscribe } from "@/app/actions/subscribe"
import EmailSubscription from "@/components/home/footer/email-subscription-form"

export default function EmailSubscriptionFormWrapper() {
	return <EmailSubscription subscribeAction={subscribe} />
}
