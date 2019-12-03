<template>
    <div class="home">
        <!-- 这边欢迎界面 -->
        <show connectComponent = "home"></show>
    </div>
</template>

<script>
import show from "../components/show"
export default {
    name: 'home',
    components: {
        show
    }
}
</script>
