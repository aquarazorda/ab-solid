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
				<Title>SolidStart - Bare</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Link rel="preload" href="/styles/styles.min.css" as="style" />
				<Link rel="stylesheet" href="/styles/styles.min.css" />
				<Link rel="preload" href="/styles/new-font.css" as="style" />
				<Link rel="stylesheet" href="/styles/new-font.css" />
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
