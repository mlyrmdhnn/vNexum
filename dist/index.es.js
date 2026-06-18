import { Fragment as e, TransitionGroup as t, computed as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, createTextVNode as o, createVNode as s, defineComponent as c, inject as l, isReactive as u, isRef as d, mergeModels as f, normalizeClass as p, normalizeStyle as m, onMounted as h, onUnmounted as g, openBlock as _, reactive as v, ref as y, renderList as b, renderSlot as x, toDisplayString as S, unref as C, useModel as w, vModelText as T, watch as E, withCtx as D, withDirectives as O, withModifiers as k } from "vue";
//#region lib/fetch/helpers.ts
var A = (e) => new Promise((t) => setTimeout(t, e)), j = (e) => {
	let t = {};
	return Object.entries(e || {}).forEach(([e, n]) => {
		n != null && (t[e] = String(n));
	}), new URLSearchParams(t).toString();
}, M = [], N = (e, t) => {
	M.push({
		status: e,
		fn: t
	});
}, P = async (e, t) => {
	for (let n of M) n.status === e && await n.fn(t);
}, F = {
	baseURL: "your domain",
	headers: {},
	statusHooks: []
}, I = (e) => ({
	baseURL: e?.baseURL ?? "your domain" ?? "",
	headers: e?.headers ?? {},
	statusHooks: []
}), L = {
	baseURL(e) {
		F.baseURL = e;
	},
	getBaseURL() {
		return F.baseURL;
	},
	headers(e) {
		F.headers = {
			...F.headers,
			...e
		};
	},
	getHeaders() {
		return F.headers;
	},
	onError(e, t) {
		N(e, t);
	}
}, R = /* @__PURE__ */ new Map(), ee = (e, t, n) => `${t}:${e}:${JSON.stringify(n)}`, z = (e) => R.get(e), te = (e, t) => {
	R.set(e, t);
}, ne = (e) => {
	R.delete(e);
}, B = 0, V = () => {
	let e = [], t = [], n = [];
	return {
		interceptor: {
			request: {
				use(t) {
					let n = ++B;
					return e.push({
						id: n,
						fn: t
					}), n;
				},
				eject(t) {
					let n = e.findIndex((e) => e.id === t);
					n !== -1 && e.splice(n, 1);
				},
				push(e) {
					return this.use(e);
				}
			},
			response: {
				use(e) {
					let n = ++B;
					return t.push({
						id: n,
						fn: e
					}), n;
				},
				eject(e) {
					let n = t.findIndex((t) => t.id === e);
					n !== -1 && t.splice(n, 1);
				},
				push(e) {
					return this.use(e);
				}
			},
			error: {
				use(e) {
					let t = ++B;
					return n.push({
						id: t,
						fn: e
					}), t;
				},
				eject(e) {
					let t = n.findIndex((t) => t.id === e);
					t !== -1 && n.splice(t, 1);
				},
				push(e) {
					return this.use(e);
				}
			}
		},
		requestInterceptors: e,
		responseInterceptors: t,
		errorInterceptors: n
	};
}, { interceptor: re, requestInterceptors: ie, responseInterceptors: ae, errorInterceptors: oe } = V(), H = async ({ endpoint: e, options: t, controller: n, instanceConfig: r, instanceRequestInterceptors: i, instanceResponseInterceptors: a, instanceErrorInterceptors: o }) => {
	let s = r ?? F, { method: c = "GET", params: l = {}, payload: u = null, credentials: d = !1, headers: f = {}, timeout: p = 1e4, retry: m = 0, retryDelay: h = 1e3, cache: g = !1, cacheKey: _, baseURL: v = s.baseURL, dedup: y = !1, skipInterceptor: b = !1 } = t, x = [...ie, ...i ?? []], S = [...ae, ...a ?? []], C = [...oe, ...o ?? []], w = j(l);
	if (!e || e.trim() === "") return console.error("[useFetch] Warning: endpoint is empty.\n\nThis may cause requests to fail. Please provide a valid endpoint.");
	if (!v && !e.startsWith("http://") && !e.startsWith("https://")) return console.error(`[useFetch] Warning: baseURL is not set and endpoint is not absolute URL.\n\n  endpoint: ${e}\n\nThis may cause requests to fail. Please set a baseURL or use absolute URLs.`);
	let T = ((e, t) => e.endsWith("/") && t.startsWith("/") ? e + t.slice(1) : e + t)(v, e), E = async () => {
		let e = 0;
		for (; e <= m;) try {
			let e = typeof u == "function" ? await u() : u, t = e instanceof FormData;
			n = new AbortController();
			let i = setTimeout(() => n.abort(), p), a = {
				method: c,
				headers: {
					Accept: "application/json",
					...t ? {} : { "Content-Type": "application/json" },
					"X-Requested-With": "XMLHttpRequest",
					...F.headers,
					...s.headers,
					...f
				},
				credentials: d ? "include" : "same-origin",
				signal: n.signal,
				body: c === "GET" ? void 0 : t ? e : JSON.stringify(e)
			};
			if (!b) for (let e of x) a = await e.fn(a);
			let o = await fetch(`${T}${w ? `?${w}` : ""}`, a), l = o.status;
			clearTimeout(i);
			let m = o.headers.get("content-type"), h;
			h = m && m.includes("application/json") ? await o.json() : await o.text();
			let g = {
				data: h,
				status: o.status,
				statusText: o.statusText,
				headers: o.headers
			};
			if (!b) for (let e of S) g = await e.fn(g);
			if (h = g.data, !o.ok) {
				await P(o.status, h);
				let e = r?.statusHooks ?? [];
				for (let t of e) t.status === o.status && await t.fn(h);
				let t = Error(typeof h == "string" ? h : JSON.stringify(h));
				throw t.statusCode = o.status, t.data = h, t;
			}
			return {
				data: h,
				statusCode: l
			};
		} catch (t) {
			if (e++, e <= m) {
				await A(h);
				continue;
			}
			let n = t;
			if (!b) for (let e of C) n = await e.fn(n);
			throw n;
		}
	};
	if (y && c === "GET") {
		let t = ee(e, c, l), n = z(t);
		if (n) return n;
		let r = E().finally(() => ne(t));
		return te(t, r), r;
	}
	return E();
}, se = (e, t) => {
	if (e) if (d(e)) {
		E(e, t, { deep: !0 });
		return;
	} else if (u(e)) {
		E(e, t, { deep: !0 });
		return;
	} else E(() => e, t, { deep: !0 });
}, U = (e, t) => t.split(".").reduce((e, t) => e?.[t], e), W = (e, t, n = "") => {
	let { dataKey: r, totalKey: i, currentPageKey: a, linksKey: o, fromKey: s, toKey: c } = t, l = e[n];
	return {
		data: U(l, r || "data"),
		from: U(l, s ?? "from"),
		to: U(l, c ?? "to"),
		total: U(l, i ?? "total"),
		links: U(l, o ?? "links"),
		current_page: U(l, a ?? "current_page")
	};
}, ce = (e) => {
	try {
		let t = sessionStorage.getItem(e);
		return t ? JSON.parse(t).data : null;
	} catch (t) {
		return console.warn(`[Cache] Failed to parse cache for key: ${e}`, t), sessionStorage.removeItem(e), null;
	}
}, G = (e, t, n = "") => {
	try {
		if (t === void 0) {
			sessionStorage.removeItem(e);
			return;
		}
		let r = {
			data: t,
			desc: n || `Cache for ${e}`,
			timestamp: Date.now(),
			lastUpdated: (/* @__PURE__ */ new Date()).toLocaleDateString()
		};
		sessionStorage.setItem(e, JSON.stringify(r));
	} catch (t) {
		console.warn(`[Cache] Failed to set cache for key: ${e}`, t);
	}
}, K = (e, t) => {
	if (e === t) return !0;
	if (e == null || t == null) return !1;
	try {
		return JSON.stringify(e) === JSON.stringify(t);
	} catch (e) {
		return console.warn("[Cache] isEqualCache failed", e), !1;
	}
}, le = (e) => {
	let t = [];
	for (let n = 0; n < sessionStorage.length; n++) {
		let r = sessionStorage.key(n);
		r?.includes(e) && t.push(r);
	}
	t.forEach((e) => {
		sessionStorage.removeItem(e);
	});
};
//#endregion
//#region http/useFetch.ts
function q(e, t = {}, n, r) {
	let { immediate: i = !0, method: a = "GET", watchParams: o = !1, pagination: s = !1, paginationKey: c = {}, pick: l = "", transform: u, cache: d = !1, cacheKey: f = e, cacheRevalidate: p = !1, cacheDescription: m = "", onBeforeRequest: h, onSuccess: g, onError: _, onFinally: v, skipInterceptor: b, ...x } = t, S = y(null), C = y(null), w = y(!1), T = y("idle"), E = y([]), D = y(0), O = y(0), k = y(0), A = y(1), j = y(0), M = new AbortController(), N = (e, t) => t ? t.split(".").reduce((e, t) => e?.[t], e) : e, P = (e) => typeof e == "function" ? e() : e, F = async (t, i) => {
		try {
			let { data: o } = await H({
				endpoint: e,
				controller: new AbortController(),
				options: {
					...x,
					method: a,
					cache: !1,
					cacheKey: f,
					skipInterceptor: b
				},
				instanceConfig: n,
				instanceRequestInterceptors: r?.requestInterceptors,
				instanceResponseInterceptors: r?.responseInterceptors,
				instanceErrorInterceptors: r?.errorInterceptors
			});
			if (s) {
				let e = W(o, c, l), n = e.data;
				u && (n = u(n));
				let r = {
					data: n,
					links: e.links,
					from: e.from,
					to: e.to,
					total: e.total,
					currentPage: e.current_page
				};
				K(t, r) || (le(f), G(i, r, m), S.value = r.data, E.value = r.links, D.value = r.from, O.value = r.to, k.value = r.total, A.value = r.currentPage);
				return;
			}
			let d = N(o, l);
			u && (d = u(d)), K(t, d) || (G(i, d, m), S.value = d);
		} catch (e) {
			console.warn(`Background revalidate failed for ${i}`, e);
		}
	}, I = async () => {
		try {
			w.value = !0, T.value = "pending", C.value = null;
			let i = P(t.payload);
			h?.(i), e + JSON.stringify(t.params ?? {});
			let o = e + JSON.stringify(t.params ?? {}) + f;
			if (d) {
				let e = ce(o);
				if (e !== null) return s && typeof e == "object" && "data" in e ? (S.value = e.data, E.value = e.links || [], D.value = e.from || 0, O.value = e.to || 0, k.value = e.total || 0, A.value = e.currentPage || 1) : S.value = e, T.value = "success", w.value = !1, p && F(e, o), e;
			}
			let { data: _, statusCode: v } = await H({
				endpoint: e,
				controller: M,
				options: {
					...x,
					method: a,
					endpoint: e,
					cacheKey: f,
					skipInterceptor: b,
					cache: !1
				},
				instanceConfig: n,
				instanceRequestInterceptors: r?.requestInterceptors,
				instanceResponseInterceptors: r?.responseInterceptors,
				instanceErrorInterceptors: r?.errorInterceptors
			});
			if (j.value = v, s) {
				let e = W(_, c, l), t = e.data;
				u && (t = u(t));
				let n = {
					data: t,
					links: e.links,
					from: e.from,
					to: e.to,
					total: e.total,
					currentPage: e.current_page
				};
				d && G(o, n, m), S.value = t, E.value = e.links, D.value = e.from, O.value = e.to, k.value = e.total, A.value = e.current_page;
			} else {
				let e = N(_, l);
				u && (e = u(e)), d && G(o, e, m), S.value = e;
			}
			return T.value = "success", g?.(_), S.value;
		} catch (e) {
			T.value = "error", C.value = e, j.value = e?.statusCode || 0, _?.(e);
		} finally {
			w.value = !1, v?.();
		}
	};
	return a !== "GET" && (i = !1), i && (T.value = "pending", I()), o && se(t.params, () => I()), {
		data: S,
		error: C,
		pending: w,
		status: T,
		links: E,
		from: D,
		to: O,
		total: k,
		currentPage: A,
		statusCode: j,
		execute: I,
		refresh: () => I(),
		clear: () => {
			S.value = null, C.value = null, T.value = "idle", E.value = [], D.value = 0, O.value = 0, k.value = 0, A.value = 1, j.value = 0;
		},
		abort: () => {
			M.abort(), M = new AbortController();
		}
	};
}
function ue(e, t = {}) {
	return q(e, t);
}
var J = ue;
J.baseURL = L.baseURL, J.headers = L.headers, J.interceptor = re, J.onError = L.onError, J.create = (e) => {
	let t = I(e), n = V(), r = (e, r = {}) => q(e, r, t, n);
	return r.baseURL = (e) => {
		t.baseURL = e;
	}, r.headers = (e) => {
		t.headers = {
			...t.headers,
			...e
		};
	}, r.onError = (e, n) => {
		t.statusHooks.push({
			status: e,
			fn: n
		});
	}, r.interceptor = n.interceptor, r;
}, Array.isArray, Symbol(process.env.NODE_ENV === "production" ? "" : "navigation failure"), Symbol(process.env.NODE_ENV === "production" ? "" : "router view location matched"), Symbol(process.env.NODE_ENV === "production" ? "" : "router view depth");
var de = Symbol(process.env.NODE_ENV === "production" ? "" : "router"), fe = Symbol(process.env.NODE_ENV === "production" ? "" : "route location");
Symbol(process.env.NODE_ENV === "production" ? "" : "router view location");
function pe() {
	return l(de);
}
function me(e) {
	return l(fe);
}
//#endregion
//#region handler/useDebounceFn.ts
function he(e, t = 300) {
	let n = null, r = (...r) => {
		clearTimeout(n), n = setTimeout(() => {
			e(...r);
		}, t);
	};
	return r.cancel = () => {
		clearTimeout(n), n = null;
	}, g(r.cancel), r;
}
//#endregion
//#region components/FetchTable.vue?vue&type=script&setup=true&lang.ts
var ge = ["placeholder"], _e = { key: 0 }, ve = ["colspan"], ye = ["onClick", "disabled"], be = /* @__PURE__ */ c({
	__name: "FetchTable",
	props: /*@__PURE__*/ f({
		cols: { default: () => [] },
		title: { default: "Table" },
		cssClass: { default: () => ({}) },
		showSearch: {
			type: Boolean,
			default: !1
		},
		searchPlaceholder: { default: "Search something..." },
		showActions: {
			type: Boolean,
			default: !1
		},
		pick: {},
		endpoint: { default: "" },
		notFoundText: { default: "Data Not Found" }
	}, {
		modelValue: {},
		modelModifiers: {}
	}),
	emits: ["update:modelValue"],
	setup(t) {
		let s = me(), c = pe(), l = t, u = n(() => ({
			divCss: "w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
			titleCss: "text-xl font-semibold text-slate-800 tracking-tight",
			headerCss: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b border-slate-200",
			searchCss: "w-full md:w-72 px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl outline-none transition-all focus:ring-4 focus:ring-blue-100 focus:border-blue-500 placeholder:text-slate-400",
			tableWrapperCss: "w-full overflow-x-auto",
			tableCss: "w-full border-collapse min-w-[600px]",
			theadCss: "bg-slate-50",
			tbodyCss: "divide-y divide-slate-100",
			trCss: "transition-colors hover:bg-slate-50",
			thCss: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500",
			tdCss: "px-6 py-4 text-sm text-slate-700",
			tdCssLoading: "px-6 py-5 relative before:block before:h-4 before:w-full before:rounded-lg before:bg-slate-200 before:animate-pulse",
			notFoundCss: "py-16 text-center text-sm text-slate-400",
			navCss: "flex flex-wrap items-center justify-end gap-2 p-6 border-t border-slate-200",
			navButton: "h-10 min-w-[40px] px-3 text-sm font-medium border border-slate-300 bg-white rounded-xl hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed",
			activeButton: "h-10 min-w-[40px] px-3 text-sm font-medium rounded-xl bg-neutral-900 text-slate-200 shadow-sm",
			navCssButtonLoading: "h-10 w-10 rounded-xl bg-slate-200 animate-pulse",
			...l.cssClass
		})), d = v({ ...s.query });
		E(() => s.query, (e) => {
			Object.assign(d, e);
		}, { deep: !0 });
		let { data: f, pending: m, links: g, execute: y } = J(l.endpoint, {
			watchParams: !0,
			params: d,
			pagination: !0,
			pick: l.pick,
			immediate: !1
		});
		h(() => {
			y();
		});
		let D = n(() => f.value ? Array.isArray(f.value) ? f.value : typeof f.value == "object" && "data" in f.value && Array.isArray(f.value.data) ? f.value.data : [] : []), k = (e) => {
			if (!e) return;
			let t = new URL(e).searchParams.get("page");
			c.push({
				path: s.path,
				query: {
					...s.query,
					page: t
				}
			});
		}, A = w(t, "modelValue"), j = he((e) => {
			c.push({ query: {
				...s.query,
				page: 1,
				search: e
			} });
		}, 500);
		E(A, (e) => {
			j(e);
		});
		let M = (e) => e.includes("&laquo") || e.toLowerCase().includes("&laquo") ? "Previous" : e.includes("&raquo") || e.toLowerCase().includes("&raquo") ? "Next" : e, N = (e, t) => t ? t.split(".").reduce((e, t) => e == null ? "" : Array.isArray(e) ? e.map((e) => e[t]).join(", ") : e[t], e) : "";
		return (t, n) => (_(), i("div", { class: p(u.value.divCss) }, [
			a("div", { class: p(u.value.headerCss) }, [a("h2", { class: p(u.value.titleCss) }, S(l.title), 3), l.showSearch ? O((_(), i("input", {
				key: 0,
				type: "text",
				"onUpdate:modelValue": n[0] ||= (e) => A.value = e,
				class: p(u.value.searchCss),
				placeholder: l.searchPlaceholder
			}, null, 10, ge)), [[T, A.value]]) : r("", !0)], 2),
			x(t.$slots, "component"),
			C(m) ? r("", !0) : (_(), i(e, { key: 0 }, [a("div", { class: p(u.value.tableWrapperCss) }, [a("table", { class: p(u.value.tableCss) }, [x(t.$slots, "thead", {}, () => [a("thead", { class: p(u.value.theadCss) }, [a("tr", { class: p(u.value.trCss) }, [
				a("th", { class: p(u.value.thCss) }, "No", 2),
				(_(!0), i(e, null, b(l.cols, (e, t) => (_(), i("th", {
					key: "th-" + t,
					scope: "col",
					class: p(u.value.thCss)
				}, S(e.label), 3))), 128)),
				l.showActions ? (_(), i("th", {
					key: 0,
					class: p(u.value.thCss)
				}, "Actions", 2)) : r("", !0)
			], 2)], 2)]), a("tbody", { class: p(u.value.tbodyCss) }, [(_(!0), i(e, null, b(D.value, (n, s) => (_(), i("tr", {
				class: p(u.value.trCss),
				key: s
			}, [
				a("td", { class: p([u.value.tdCss, "text-center"]) }, S(s + 1), 3),
				(_(!0), i(e, null, b(l.cols, (e, r) => (_(), i("td", {
					key: "td-" + r,
					class: p(u.value.tdCss)
				}, [x(t.$slots, e.label, { row: n }, () => [o(S(N(n, e.key)), 1)])], 2))), 128)),
				l.showActions ? (_(), i("td", {
					key: 0,
					class: p(u.value.tdCss)
				}, [x(t.$slots, "actions", { row: n })], 2)) : r("", !0)
			], 2))), 128)), D.value.length === 0 ? (_(), i("tr", _e, [a("td", {
				colspan: l.cols.length + +!!l.showActions,
				class: p(u.value.notFoundCss)
			}, S(l.notFoundText), 11, ve)])) : r("", !0)], 2)], 2)], 2), a("nav", { class: p(u.value.navCss) }, [(_(!0), i(e, null, b(C(g), (e, t) => (_(), i("button", {
				onClick: (t) => k(e.url),
				key: t,
				disabled: !e.url,
				class: p([e.active ? u.value.activeButton : u.value.navButton, e.url == null ? "cursor-not-allowed" : "cursor-pointer"])
			}, S(M(e.label)), 11, ye))), 128))], 2)], 64)),
			C(m) ? (_(), i(e, { key: 1 }, [a("div", { class: p(u.value.tableWrapperCss) }, [a("table", { class: p(u.value.tableCss) }, [x(t.$slots, "thead", {}, () => [a("thead", { class: p(u.value.theadCss) }, [a("tr", { class: p(u.value.trCss) }, [(_(!0), i(e, null, b(l.cols, (e, t) => (_(), i("th", {
				key: "th-" + t,
				class: p(u.value.thCss)
			}, S(e.label), 3))), 128)), l.showActions ? (_(), i("th", {
				key: 0,
				class: p(u.value.thCss)
			}, "Actions", 2)) : r("", !0)], 2)], 2)]), a("tbody", { class: p(u.value.tbodyCss) }, [(_(), i(e, null, b(10, (t) => a("tr", {
				key: t,
				class: p(u.value.trCss)
			}, [(_(!0), i(e, null, b(l.cols, (e, t) => (_(), i("td", {
				key: "td-" + t,
				class: p(u.value.tdCssLoading)
			}, null, 2))), 128)), l.showActions ? (_(), i("td", {
				key: 0,
				class: p(u.value.tdCssLoading)
			}, null, 2)) : r("", !0)], 2)), 64))], 2)], 2)], 2), a("nav", { class: p(u.value.navCss) }, [(_(), i(e, null, b(5, (e) => a("button", {
				key: e,
				class: p(u.value.navCssButtonLoading)
			}, null, 2)), 64))], 2)], 64)) : r("", !0)
		], 2));
	}
}), xe = (e) => {
	let t = new Blob([JSON.stringify(e)]).size;
	return t < 1024 ? `${t} B` : t < 1024 * 1024 ? `${(t / 1024).toFixed(1)} KB` : `${(t / (1024 * 1024)).toFixed(2)} MB`;
}, Se = (e) => {
	try {
		let t = JSON.parse(e);
		return Array.isArray(t) ? "array" : typeof t == "object" && t ? "object" : typeof t;
	} catch {
		return "string";
	}
}, Ce = (e) => {
	try {
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.length : typeof t == "object" && t ? Object.keys(t).length : null;
	} catch {
		return null;
	}
}, Y = () => {
	let e = [];
	for (let t = 0; t < sessionStorage.length; t++) {
		let n = sessionStorage.key(t);
		if (!n) continue;
		let r = sessionStorage.getItem(n) ?? "";
		e.push({
			key: n,
			value: r,
			size: xe(r),
			type: Se(r),
			entryCount: Ce(r),
			capturedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return e;
}, X = v({ toasts: [] }), Z = {
	add(e, t = "info", n = "dark") {
		let r = Date.now();
		X.toasts.push({
			id: r,
			message: e,
			type: t,
			mode: n
		}), setTimeout(() => this.remove(r), 3e3);
	},
	remove(e) {
		X.toasts = X.toasts.filter((t) => t.id !== e);
	},
	success(e, t = "dark") {
		this.add(e, "success", t);
	},
	error(e, t = "dark") {
		this.add(e, "error", t);
	},
	info(e, t = "dark") {
		this.add(e, "info", t);
	},
	warning(e, t = "dark") {
		this.add(e, "warning", t);
	}
}, we = { class: "flex items-center gap-2" }, Te = { class: "p-3 border-b border-slate-800" }, Ee = { class: "flex h-[calc(100%-101px)]" }, De = { class: "w-80 border-r border-slate-800 overflow-y-auto" }, Oe = {
	key: 0,
	class: "flex flex-col items-center justify-center h-full gap-2 py-12"
}, ke = ["onClick"], Ae = { class: "flex justify-between items-center" }, je = { class: "text-sm text-white truncate" }, Me = { class: "text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400" }, Ne = { class: "flex-1 flex flex-col" }, Pe = {
	key: 0,
	class: "flex flex-col items-center justify-center h-full gap-2 text-slate-500"
}, Fe = { class: "px-4 py-3 border-b border-slate-800 flex items-center justify-between" }, Ie = { class: "flex flex-col gap-1" }, Le = { class: "text-white font-medium" }, Re = { class: "flex items-center gap-2 flex-wrap" }, ze = { class: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono" }, Be = { class: "text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400" }, Ve = {
	key: 0,
	class: "text-sm text-slate-400 mt-1"
}, He = {
	key: 1,
	class: "flex items-center gap-3 mt-1"
}, Ue = {
	key: 0,
	class: "text-[12px] text-slate-500 font-mono"
}, We = {
	key: 1,
	class: "text-[12px] text-slate-500 font-mono"
}, Ge = { class: "flex-1 overflow-auto p-4" }, Ke = { class: "text-sm text-green-400 font-mono whitespace-pre-wrap break-all" }, qe = /* @__PURE__ */ c({
	__name: "SessionStorageWindow",
	setup(t) {
		let o = y(Y()), s = () => {
			o.value = Y();
		};
		setInterval(() => {
			s();
		}, 1e3);
		let c = y(!0), l = y(""), u = y(o.value[0]), d = n(() => o.value.filter((e) => e.key.toLowerCase().includes(l.value.toLowerCase()))), f = v({
			x: window.innerWidth - 950,
			y: 80
		}), h = v({
			width: 900,
			height: 600
		}), g = !1, x = (e) => {
			g = !0;
			let t = e.clientX - f.x, n = e.clientY - f.y, r = (e) => {
				if (!g) return;
				let r = c.value ? 40 : h.width, i = c.value ? 40 : h.height;
				f.x = Math.max(0, Math.min(e.clientX - t, window.innerWidth - r)), f.y = Math.max(0, Math.min(e.clientY - n, window.innerHeight - i));
			}, i = () => {
				g = !1, window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", i);
			};
			window.addEventListener("mousemove", r), window.addEventListener("mouseup", i);
		}, C = (e) => {
			e.stopPropagation();
			let t = h.width, n = h.height, r = e.clientX, i = e.clientY, a = (e) => {
				h.width = Math.max(600, t + (e.clientX - r)), h.height = Math.max(300, n + (e.clientY - i));
			}, o = () => {
				window.removeEventListener("mousemove", a), window.removeEventListener("mouseup", o);
			};
			window.addEventListener("mousemove", a), window.addEventListener("mouseup", o);
		}, w = (e) => {
			try {
				return JSON.stringify(JSON.parse(e), null, 2);
			} catch {
				return e;
			}
		}, E = n(() => {
			try {
				let e = JSON.parse(u.value?.value ?? u.value);
				return {
					desc: e?.desc ?? null,
					timestamp: e?.timestamp ?? null,
					lastUpdated: e?.lastUpdated ?? null
				};
			} catch {
				return {
					desc: null,
					timestamp: null,
					lastUpdated: null
				};
			}
		}), D = (e) => {
			try {
				sessionStorage.removeItem(e), Z.success("Success to delete session storage"), s();
			} catch {
				Z.error("Failed to remove session storage");
			}
		};
		return (t, n) => c.value ? (_(), i("div", {
			key: 0,
			class: "fixed z-[2147483647] w-10 h-10 bg-slate-900 border border-slate-700 rounded-full shadow-2xl flex items-center justify-center cursor-move select-none group",
			style: m({
				left: `${f.x}px`,
				top: `${f.y}px`
			}),
			onMousedown: x,
			onDblclick: n[0] ||= (e) => c.value = !1,
			title: "Double-click to expand"
		}, [...n[4] ||= [a("svg", {
			class: "w-5 h-5 text-green-400",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "2",
			viewBox: "0 0 24 24"
		}, [a("path", { d: "M4 7h16M4 12h16M4 17h16" })], -1), a("div", { class: "absolute bottom-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" }, " Session Inspector ", -1)]], 36)) : (_(), i("div", {
			key: 1,
			class: "fixed bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-[2147483647]",
			style: m({
				left: `${f.x}px`,
				top: `${f.y}px`,
				width: `${h.width}px`,
				height: `${h.height}px`
			})
		}, [
			a("div", {
				class: "h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900 cursor-move select-none",
				onMousedown: x
			}, [n[6] ||= a("div", { class: "flex items-center gap-2" }, [a("svg", {
				class: "w-5 h-5 text-green-400",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				viewBox: "0 0 24 24"
			}, [a("path", { d: "M4 7h16M4 12h16M4 17h16" })]), a("h2", { class: "text-sm font-semibold text-white" }, " Session Storage Inspector ")], -1), a("div", we, [a("button", {
				class: "p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white",
				onClick: n[1] ||= k((e) => c.value = !0, ["stop"]),
				title: "Minimize"
			}, [...n[5] ||= [a("svg", {
				class: "w-4 h-4",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				viewBox: "0 0 24 24"
			}, [a("path", { d: "M5 12h14" })], -1)]])])], 32),
			a("div", Te, [O(a("input", {
				"onUpdate:modelValue": n[2] ||= (e) => l.value = e,
				type: "text",
				placeholder: "Search session storage...",
				class: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-green-500"
			}, null, 512), [[T, l.value]]), a("h2", {
				class: "text-white font-semibold",
				onClick: s
			}, "Refresh")]),
			a("div", Ee, [a("div", De, [d.value.length === 0 ? (_(), i("div", Oe, [...n[7] ||= [a("svg", {
				class: "w-8 h-8 text-slate-600",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "1.5",
				viewBox: "0 0 24 24"
			}, [a("path", { d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" })], -1), a("p", { class: "text-xs text-slate-500" }, "No session storage found", -1)]])) : r("", !0), (_(!0), i(e, null, b(d.value, (e) => (_(), i("div", {
				key: e.key,
				onClick: (t) => u.value = e,
				class: p(["px-4 py-3 border-b border-slate-900 cursor-pointer transition-colors", u.value?.key === e.key ? "bg-slate-800" : "hover:bg-slate-900"])
			}, [a("div", Ae, [a("span", je, S(e.key), 1), a("span", Me, S(e.size), 1)])], 10, ke))), 128))]), a("div", Ne, [u.value ? (_(), i(e, { key: 1 }, [a("div", Fe, [a("div", Ie, [
				a("h3", Le, S(u.value.key ?? ""), 1),
				a("div", Re, [a("span", ze, S(u.value.type ?? ""), 1), a("span", Be, S(u.value.size ?? ""), 1)]),
				E.value.desc ? (_(), i("p", Ve, S(E.value.desc ?? ""), 1)) : r("", !0),
				E.value.timestamp || E.value.lastUpdated ? (_(), i("div", He, [E.value.timestamp ? (_(), i("p", Ue, S(new Date(E.value.timestamp).toLocaleString() ?? ""), 1)) : r("", !0), E.value.lastUpdated ? (_(), i("p", We, " Last updated: " + S(E.value.lastUpdated ?? ""), 1)) : r("", !0)])) : r("", !0)
			]), a("button", {
				onClick: n[3] ||= (e) => D(u.value.key ?? ""),
				class: "px-3 py-1.5 text-sm rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 self-start"
			}, " Delete ")]), a("div", Ge, [a("pre", Ke, S(w(u.value.value ?? "")), 1)])], 64)) : (_(), i("div", Pe, [...n[8] ||= [a("svg", {
				class: "w-10 h-10 text-slate-700",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "1.5",
				viewBox: "0 0 24 24"
			}, [a("path", { d: "M3 7h18M3 12h18M3 17h18" })], -1), a("p", { class: "text-sm" }, "Select a key to inspect", -1)]]))])]),
			a("div", {
				class: "absolute bottom-1 right-1 w-5 h-5 cursor-se-resize flex items-end justify-end",
				onMousedown: C
			}, [...n[9] ||= [a("svg", {
				class: "w-3 h-3 text-slate-500",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2",
				viewBox: "0 0 24 24"
			}, [a("path", { d: "M14 20L20 14M10 20L20 10M6 20L20 6" })], -1)]], 32)
		], 4));
	}
}), Je = { class: "fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none" }, Ye = { class: "flex items-start gap-4 px-5 py-4" }, Q = {
	key: 0,
	class: "h-6 w-6",
	fill: "none",
	viewBox: "0 0 24 24",
	stroke: "currentColor",
	"stroke-width": "2.5"
}, Xe = {
	key: 1,
	class: "h-6 w-6",
	fill: "none",
	viewBox: "0 0 24 24",
	stroke: "currentColor",
	"stroke-width": "2.5"
}, Ze = {
	key: 2,
	class: "h-6 w-6",
	fill: "none",
	viewBox: "0 0 24 24",
	stroke: "currentColor",
	"stroke-width": "2.5"
}, Qe = {
	key: 3,
	class: "h-6 w-6",
	fill: "none",
	viewBox: "0 0 24 24",
	stroke: "currentColor",
	"stroke-width": "2.5"
}, $e = { class: "min-w-0 flex-1" }, et = ["onClick"], tt = /* @__PURE__ */ c({
	__name: "ToastContainer",
	setup(n) {
		return (n, o) => (_(), i("div", Je, [s(t, {
			"enter-active-class": "transition-all duration-300 ease-out",
			"enter-from-class": "translate-x-10 opacity-0 scale-95",
			"leave-active-class": "transition-all duration-200 ease-in",
			"leave-to-class": "translate-x-10 opacity-0 scale-95",
			"move-class": "transition-all duration-300"
		}, {
			default: D(() => [(_(!0), i(e, null, b(C(X).toasts, (e) => (_(), i("div", {
				key: e.id,
				role: "alert",
				class: p(["group relative pointer-events-auto w-[360px] rounded-2xl border shadow-2xl transition-all duration-300 overflow-hidden", [
					e.mode === "dark" ? "border-white/10" : "border-black/5",
					e.type === "success" ? "bg-gradient-to-b from-emerald-500/10 to-transparent" : "",
					e.type === "error" ? "bg-gradient-to-b from-rose-500/10 to-transparent" : "",
					e.type === "info" ? "bg-gradient-to-b from-sky-500/10 to-transparent" : "",
					e.type === "warning" ? "bg-gradient-to-b from-amber-500/10 to-transparent" : "",
					e.mode === "dark" ? "bg-neutral-900/90" : "bg-white/90 backdrop-blur-md"
				]])
			}, [a("div", Ye, [
				a("div", { class: p(["mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm", [
					e.type === "success" ? "bg-emerald-500 text-white" : "",
					e.type === "error" ? "bg-rose-500 text-white" : "",
					e.type === "info" ? "bg-sky-500 text-white" : "",
					e.type === "warning" ? "bg-amber-500 text-white" : ""
				]]) }, [
					e.type === "success" ? (_(), i("svg", Q, [...o[0] ||= [a("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M5 13l4 4L19 7"
					}, null, -1)]])) : r("", !0),
					e.type === "error" ? (_(), i("svg", Xe, [...o[1] ||= [a("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M12 8v4m0 4h.01"
					}, null, -1), a("circle", {
						cx: "12",
						cy: "12",
						r: "9"
					}, null, -1)]])) : r("", !0),
					e.type === "info" ? (_(), i("svg", Ze, [...o[2] ||= [a("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					}, null, -1)]])) : r("", !0),
					e.type === "warning" ? (_(), i("svg", Qe, [...o[3] ||= [a("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					}, null, -1)]])) : r("", !0)
				], 2),
				a("div", $e, [a("p", { class: p(["mb-0.5 text-sm font-bold capitalize", e.mode === "dark" ? "text-white" : "text-neutral-900"]) }, S(e.type), 3), a("p", { class: p(["text-sm leading-relaxed", e.mode === "dark" ? "text-neutral-400" : "text-neutral-600"]) }, S(e.message), 3)]),
				a("button", {
					onClick: (t) => C(Z).remove(e.id),
					class: p(["ml-2 mt-1 transition-opacity opacity-50 hover:opacity-100", e.mode === "dark" ? "text-white" : "text-neutral-900"])
				}, [...o[4] ||= [a("svg", {
					class: "h-4 w-4",
					fill: "none",
					viewBox: "0 0 24 24",
					stroke: "currentColor",
					"stroke-width": "2"
				}, [a("path", {
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					d: "M6 6l12 12M18 6L6 18"
				})], -1)]], 10, et)
			])], 2))), 128))]),
			_: 1
		})]));
	}
}), nt = async (e, t = "Copied to clipboard") => {
	try {
		await navigator.clipboard.writeText(e), Z.success(t);
	} catch {
		Z.error("Failed to copy");
	}
}, rt = (e, t = "date", n = "id-ID") => {
	if (!e) return;
	let r = new Date(e);
	if (isNaN(r.getTime())) throw console.error("Invalid Date"), Error();
	return t == "human" ? r.toLocaleDateString() : new Intl.DateTimeFormat(n, {
		date: {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		},
		datetime: {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit"
		},
		long: {
			year: "numeric",
			month: "long",
			day: "numeric"
		}
	}[t]).format(r);
}, it = (e, t = "id-ID") => new Intl.NumberFormat(t, {
	style: "currency",
	currency: t === "en-US" ? "USD" : t === "de-DE" ? "EUR" : t === "ja-JP" ? "JPY" : t === "id-ID" ? "IDR" : "USD"
}).format(e);
//#endregion
//#region handler/formDataHandler.ts
function at(e, t, n, r = !1) {
	let i = new FormData();
	for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
		let n = e[t];
		n != null && i.append(t, typeof n == "object" && !(n instanceof Blob) ? JSON.stringify(n) : String(n));
	}
	return n && i.append(t, n), r ? {
		formData: i,
		previewValue: n ? URL.createObjectURL(n) : ""
	} : i;
}
//#endregion
//#region handler/logger.ts
var $ = !1, ot = {
	setProduction(e) {
		$ = e;
	},
	log(e, ...t) {
		$ || console.log("%c[Nexus-Info]", "color:#10b981;font-weight:bold", e, ...t);
	},
	warn(e, ...t) {
		$ || console.warn("%c[Nexus-Warn]", "color:#f59e0b;font-weight:bold", e, ...t);
	},
	error(e, ...t) {
		$ || console.error("%c[Nexus-Error]", "color:#ef4444;font-weight:bold", e, ...t);
	}
};
//#endregion
export { be as FetchTable, qe as SessionStorageWindow, tt as ToastContainer, nt as copyToClipboard, at as documentHandler, rt as formatDate, ot as logger, it as resolveCurrency, Z as toast, X as toastState, J as useFetch };
