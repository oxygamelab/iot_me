<template>
    <div>
        <ul><li v-for="(v,k) in obj1">{{v}}</li></ul>
        <div>{{var1}}</div>
        <div v-html="var2"></div>
        <div :class="var3">{{var3}}</div>
        <ul><li v-for='(item,index) in var4' :key="item.id" v-html="plus1(index)"></li></ul>
        <template v-for='(item,index) in var4'>
            {{index}}
        </template>
        <template v-for="(list,i) in var4">
            <span :key="i"></span>
        </template>
        <template v-for="list in lists">
            <list-header :list="list" :key="'b'+list.id"></list-header>
            <list-item v-for="item in list.items" :item="item" :key="'a'+item.id"></list-item>
        </template>
        <p v-if="seen">Now you see me</p>
        <a :href="var5" v-on:click="aclick($event)">link</a>
        <a :[var6]="var5">link2</a>
        <a :[var6]="var5" v-on:[var7]="aclick($event)">link3</a>
        <a :[var6]="var5" v-on:[var7].prevent="bclick">link4</a>
        <a :[var6]="var5" @[var7].prevent="bclick">link5</a>
        <div id="example1">{{ var8.split(' ').reverse().join(' ') }}</div>
        <div id="example2">
            <p>Original message: "{{ var8 }}"</p>
            <p>Computed reversed message: "{{ var9 }}"</p>
            <p>Computed reversed message: "{{ var10() }}"</p>
        </div>
        <div>{{ now }}</div>
        <div id="demo">{{ fullName }}</div>
        <a href="#" @[var7].prevent="cclick">link6</a>
        <div id="watch-example">
            <p>
                Ask a yes/no question:
                <input v-model="question">
            </p>
            <p>{{ answer }}</p>
        </div>
        <div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }">a1</div>
        <div class="static" v-bind:class="classObject">a2</div>
        <div v-bind:class="[activeClass, errorClass]">a3</div>
        <div v-bind:class="[isActive ? activeClass : '', errorClass]">a4</div>
        <div v-bind:class="[{ active: isActive }, errorClass]">a5</div>
        <Mydiv :style="{fontSize: `${font_size}px`}"></Mydiv>
        <Mydiv :style="style"></Mydiv>
        <div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">a6</div>
        <div><input :key="var11" :ref="var11" /></div>

    </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Mydiv from './Mydiv'
import lists from './lists'


export default {
    data() {
        return {
            var1: 'test1',
            var2: '<h1>hi boss..</h1>',
            var3: 'var3',
            var4: [1,2,3,4,5],
            lists: lists,
            seen: true,
            var5: 'https://volkandagdelen.com',
            var6: 'href',
            var7: 'click',
            var8: 'hi boss',
            firstName: 'Foo',
            lastName: 'Bar',
            //fullName: 'Foo Bar',
            question: '',
            answer: 'I cannot give you an answer until you ask a question!',
            isActive: true,
            hasError: false,
            error: null,
            /* classObject: {
                active: true,
                'text-danger': false
            } */
            activeClass: 'active',
            errorClass: 'text-danger',
            font_size: 30,
            styleObject: {
                fontSize: '40px',
                color: 'red',
            },
            var11: 'volkan',
            obj1a: {a1:'volkan',a2:'hi boss'},
        }
    },
    computed: {
        var9: function() {
            return this.var8.split(' ').reverse().join(' ')
        },
        now: function () {
            return Date.now()
        },
        fullName: function () {
            return this.firstName + ' ' + this.lastName
        },
        classObject: function () {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            }
        },
        style: function() {
            return this.styleObject
        },
        chn: function() {
            return this.var11=='volkan'?'caglar':'volkan'
        },
        obj1: function() {
            this.obj1a['a3'] = 'caglar'
            return this.obj1a
        }
    },
    methods: {
        plus1: function(i) {
            return `<li>${this.var1}-${i}</li>`
            //return `${i || 'a'}`
        },
        aclick: function(e){
            alert('hi');
            e.preventDefault();
        },
        bclick: function(e){
            alert('hi');
            alert(this.now)
            alert(this.now2())
            //this.var1=this.now
        },
        cclick: function(e){
            this.firstName = 'hi'
            //this.isActive = 0
            //this.error = { type:'fatal' }
            //this.styleObject.color = 'blue'
            this.var11 = this.chn
            this.$refs.volkan.value=this.var11
            //this.obj1.a3 = 'caglar';
        },
        var10: function() {
            return this.var8.split(' ').reverse().join(' ')
        },
        now2: function () {
            return Date.now()
        },
        getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
                .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
            })
            .catch(function (error) {
                vm.answer = 'Error! Could not reach the API.' + error
            })
        }
    },
    components: {
        'list-header': {
            template: '<h2>{{list.name}}</h2>',
            props: ['list']
        },
        'list-item': {
            template: `<div>{{item.id}} - {{item.name}}</div>`,
            props: ['item']
        },
        Mydiv,
    },
    watch: {
        /* firstName: function (val) {
            this.fullName = val + ' ' + this.lastName
        }, */
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val
        },
        question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
        }
    },
    created: function () {
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
h2 {
    font-size: font_size;
}
</style>