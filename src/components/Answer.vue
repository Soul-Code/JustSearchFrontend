<template>
    <mu-container class="answer-main">
        <mu-expansion-panel>
            <div slot="header">1.我我是题目的内容我是题目的内容我是题目的内容我是题目的内容</div>
            
            <mu-button slot="action" flat>Cancel</mu-button>
            <mu-button slot="action" flat color="primary">Save</mu-button>
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">Panel 2</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </mu-expansion-panel>
        <mu-expansion-panel>
            <div slot="header">Panel 3</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
        </mu-expansion-panel>
        <mu-flex justify-content="center" style="margin: 32px 0;">
            <mu-pagination raised :total="1000" :current.sync="current"></mu-pagination>
        </mu-flex>
    </mu-container>
</template>
<style>
.answer-main {
  margin-top: 30px;
}
</style>
