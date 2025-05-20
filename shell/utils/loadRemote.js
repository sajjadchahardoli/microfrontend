export async function loadRemoteComponent(url, scope, module) {
    // Load the remote entry script dynamically
    await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.type = "text/javascript";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    // Initialize sharing scope
    // @ts-ignore
    await __webpack_init_sharing__("default");
    const container = window[scope];
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);

    // Get the module from the remote container
    const factory = await container.get(module);
    const Module = factory();
    return Module;
}
