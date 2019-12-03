<template>
    <div class="question">
        <!-- 这边是题目界面 -->
        <show connectComponent = "question"></show>
    </div>
</template>
<script>
import show from "../components/show"
export default {
    name: 'question',
    components: {
        show
    }
}
</script>