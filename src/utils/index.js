import Vue from "vue";
import {copy} from "./copy";
import {delayPush, delayBack} from "./router";
import {formatTime} from "./time";

const utils = {
    copy,
    delayPush,
    delayBack,
    formatTime
};

Vue.prototype.$utils = utils
