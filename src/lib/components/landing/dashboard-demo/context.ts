import { getContext, setContext } from "svelte";
import type { DemoState } from "./demo-state.svelte";

const key = Symbol("dashboard-demo");

export const setDemo = (demo: DemoState) => setContext(key, demo);
export const getDemo = () => getContext<DemoState>(key);
