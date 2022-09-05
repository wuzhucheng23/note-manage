import Vue from "vue";
import common from "./common"
import client from "./client";
import server from "./server";

const api = {
    common,
    client,
    server,
}

Vue.prototype.$api = api
