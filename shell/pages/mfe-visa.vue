<script setup>
import { ref, onMounted } from 'vue';

const RemoteComp = ref(null);

const loadRemoteComponent = async (url, scope, module) => {
    try {
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
    } catch (e) {
        console.error('Error loading remote component:', e);
    }

}

onMounted(async () => {
    const module = await loadRemoteComponent(
        'http://localhost:3001/visa/remoteEntry.js',
        'mfeVisa',
        './VisaApp'
    );
    RemoteComp.value = module.default;
});
</script>

<template>
    <div>
        <h2>Remote Component:</h2>
        <component :is="RemoteComp" v-if="RemoteComp" />
    </div>
</template>
