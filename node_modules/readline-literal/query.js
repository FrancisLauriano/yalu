"use strict";

class QueryResolver {
    constructor(readline_query, question){
        this.executor = readline_query.executor;
        this.readline_query = readline_query;

        this.wholeQuestion = question;

        if(typeof question === 'string'){
            this.question = question;
        }else if(isArray(question) && question.length === 2){
            this.hasDefault = true;
            this.default = question[1];
            this.question = question[0];
        }
    }
    reply(answer){
        if(answer === '' && this.hasDefault){
            return (this.answer = this.default);
        }

        let executor = this.executor;

        return (this.answer = executor(answer));
    }
}
class ReadlineQuery {
    constructor(executor){

        if(typeof executor !== 'function'){
            executor = (answer)=>answer;
        }

        this.executor = executor;
    }
    ask(question){
        if(question instanceof ReadlineQuery){
            this.executor = question.executor;
            return this.ask(question.wholeQuestion);
        }

        if(question instanceof QueryResolver){
            return question;
        }

        return new QueryResolver(this, question);
    }
}

module.exports = ReadlineQuery;

function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]';
}
