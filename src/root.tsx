// @refresh reload
import { Suspense } from 'solid-js';
import {
	Body,
	ErrorBoundary,
	Head,
	Html,
	Link,
	Meta,
	Scripts,
	Title,
} from 'solid-start';
import { App } from './App';

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>აჭარაბეთი | ონლაინ კაზინო და ტოტალიზატორი</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta name="description" content="adjarabet.com / აჭარაბეთი - ონლაინ კაზინო და ტოტალიზატორი ყველაზე დიდი მოგებებით და საუკეთესო თამაშებით: სლოტები, სპორტი ავიატორი, პოკერი, სამაგიდო თამაშები, ლაივ კაზინო, betfair exchange, კენო, ვირტუალური სპორტი,  ითამაშე შენს მოედანზე."/>
				<Link rel="preload" href="/styles/styles.min.css" as="style" />
				<Link rel="stylesheet" href="/styles/styles.min.css" />
				<Link rel="preload" href="/styles/new-fonts.css" as="style" />
				<Link rel="stylesheet" href="/styles/new-fonts.css" />
				<Link rel="manifest" href="/manifest.json" />
			</Head>
			<Body>
				<Suspense>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
