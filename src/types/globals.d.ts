// Global type definitions for ESLint no-undef fixes
// This file ensures browser DOM APIs are properly typed

/// <reference lib="dom" />
/// <reference lib="es2017" />
/// <reference types="jest" />

declare global {
  // Jest global
  const jest: any;

  interface MediaQueryListEvent extends Event {
    readonly matches: boolean;
    readonly media: string;
  }

  interface EventListener {
    (evt: Event): void;
  }

  interface AddEventListenerOptions {
    once?: boolean;
    passive?: boolean;
    capture?: boolean;
    signal?: AbortSignal;
  }

  interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    signal?: AbortSignal;
    [key: string]: any;
  }

  interface Response {
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    json(): Promise<any>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    [key: string]: any;
  }

  class AbortController {
    readonly signal: AbortSignal;
    abort(): void;
  }

  interface Navigator {
    readonly userAgent: string;
  }

  var navigator: Navigator;
  var fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export {};
