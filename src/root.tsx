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
				<Link rel="stylesheet" href="https://www.adjarabet.com/styles.min.css?v=1677269051GE" />
				<Link rel="stylesheet" href="https://newstatic.adjarabet.com/static/atomic/buildcss/new-fonts.css" />
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
