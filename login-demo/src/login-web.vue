<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    id="login-web"
    :style="styleObject"
  >
    <el-tab-pane label="账号登录" name="first">
      <el-form :model="infos" :rules="rule" ref="infos">
        <el-form-item prop="userName">
          <el-input
            v-model="infos.userName"
            type="text"
            placeholder="账号"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="infos.password"
            type="password"
            placeholder="密码"
            maxlength="16"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item
          prop="verifycode"
          :rules="captchaDisplay ? this.rule.verifycode : [{ required: false }]"
          class="vertifyInput"
        >
          <el-input
            v-model="infos.verifycode"
            placeholder="验证码"
            v-if="captchaDisplay"
          ></el-input>
          <div class="identifybox" v-if="captchaDisplay">
            <img :src="imgSrc" alt="" @click="getCode" class="code" />
          </div>
        </el-form-item>
        <el-form-item class="loginitem">
          <el-button @click="logininfo('infos')" v-dbClick type="primary"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="form-bottom">
          <div class="loginMsg">{{ loginMsg }}</div>
          <span class="findPassBtn">找回密码</span>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="微信扫码登录" name="second">
      <div class="wechat-scanning">
        <div id="wechat-login"></div>
        <div id="wechat-msg" v-if="showmsg">
          <div class="outer">
            <div>
              <i class="el-icon-warning"></i>
              <h4>{{ wechatMsg }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div id="wechat-bottom">
        若您的账号之前没有绑定过微信，请先使用账号登录EDIP，前往个人中心进行微信绑定
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// import "../javascript/wechat";
// import $ from "jquery"; //使用jquery
// import { $get, $post } from "../javascript/utils/http";
// const sha256 = require("js-sha256").sha256; //引入sha256库
// let Base64 = require("js-base64").Base64; //引入base64库
export default {
  name: "login",
  data() {
    var regnum = /^[0-9a-zA-Z~!@#$%^&*]+$/;
    const checkinfo = (rule, value, callback) => {
      if (value) {
        if (!regnum.test(value)) {
          callback("请输入数字/字母/特殊字符");
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      loginMsg: "",
      imgSrc: "",
      captchaId: "",
      captchaDisplay: false,
      infos: {
        userName: "",
        password: "",
        verifycode: ""
      },
      rndKey: "",
      rndValue: "",
      state: "",
      lang: "",
      width: "",

      showmsg: false,
      wechatMsg: "",
      appId: "",
      deviceType: "",
      deviceId: "",
      env: "",
      textColor: "#ffffff",
      bgColor: "#64B523",
      rule: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          },
          {
            min: 4,
            max: 50,
            trigger: ["blur", "change"],
            message: "长度为4-50位！"
          },
          { required: true, trigger: ["blur", "change"], validator: checkinfo }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            max: 16,
            trigger: ["blur", "change"],
            message: "密码长度为6-16位！"
          },
          { required: true, trigger: ["blur", "change"], validator: checkinfo }
        ],
        verifycode: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入验证码"
          }
        ]
      }
    };
  },
  computed: {
    styleObject: function() {
      return {
        "--background-color": this.bgColor,
        "--text-color": this.textColor
      };
    }
  },
  methods: {
    handleClick(tab, event) {
      window.removeEventListener("message", this.wechatLoginCallback, true);
        this.activeName = tab.name;
      if (this.activeName == "second") {
        this.showmsg = false;
        this.wechatHandleLoginClick(
          this.appId,
          this.deviceType,
          this.deviceId,
          this.env,
          this.lang
        );
        window.addEventListener("message", this.wechatLoginCallback);
      }
    },

    wechatHandleLoginClick(appId, deviceType, deviceId, env, lang) {
     
    },

    getCode() {
      
    },
    logininfo(infos) {
     
    },
    wechatLoginCallback(e) {
      if (e.data.code) {
        if (e.data.code == 1000) {
          window.parent.postMessage(e.data, "*");
        } else {
          this.showmsg = true;
          this.wechatMsg = e.data.msg;
        }
      }
    }
  },
  created() {
    let that = this;
    document.onkeydown = function(e) {
      e = window.event || e;
      if (
        that.$route.path == "/login" &&
        (e.code == "Enter" || e.code == "Num Enter")
      ) {
        //验证在登录界面和按得键是回车键enter
        that.logininfo("infos"); //登录函数
      }
    };
 
  },
  mounted() {},
  destroyed() {
    window.removeEventListener("message", this.wechatLoginCallback, true);
  }
};
</script>

<style type="text/scss" lang="scss">
#login-web {
    width: 480px;
  height: 407px;
  font-size: 14px;
  background-color: #ffffff;
  border-top: 8px solid;
  border-top-color: var(--background-color);
  box-sizing: border-box;

  .el-tabs__content {
    padding: 0 60px;
  }
  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
  .el-tabs__header {
    margin: 0;
    .el-tabs__nav {
      width: 100%;
      .el-tabs__active-bar {
        width: 50% !important;
      }
      .el-tabs__item {
        width: 50%;
        text-align: center;
        padding: 0;
        font-size: 16px;
        &:hover {
          color: var(--background-color);
        }
      }
      .is-active {
        color: var(--background-color);
      }
      .el-tabs__active-bar {
        background-color: var(--background-color);
      }
    }
  }
  #pane-second {
    height: 350px;
    .el-tab-pane {
      height: 100%;
    }
    .wechat-scanning {
      //   position: absolute;
      width: 100%;
      height: 80%;
      #wechat-login {
        height: 100%;
      }
      // 微信提示语样式
      #wechat-msg {
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #ffffff;
        position: absolute;
        top: 0;
        left: 0;
        .outer {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          > div {
            line-height: 30px;
            text-align: center;
          }
          .el-icon-warning {
            color: #f56c6c;
            font-size: 40px;
          }
        }
      }
    }
    #wechat-bottom {
      height: 20%;
      line-height: 20px;
      font-size: 13px;
      text-align: center;
    }
  }
  .el-form {
    margin-top: 15px;
  }
  .el-form-item__content {
    line-height: 47px;
    height: 47px;
  }

  .el-form-item {
    margin-bottom: 22px;
    .el-input__inner {
      height: 47px;
      line-height: 47px;
      border-radius: 0;
      box-sizing: border-box;
      font-size: 14px;
    }
    .el-input__icon {
      height: 47px;
      line-height: 47px;
    }
  }
  .loginitem {
    // margin-bottom: 0 !important;
    .el-button {
      width: 100%;
      padding: 0;
      border-radius: 0;
      height: 48px;
      line-height: 48px;
      //   background-color: #64b523;
      //   color: #ffffff;
      color: var(--text-color);
      border-color: var(--background-color);
      background-color: var(--background-color);
      box-sizing: border-box;
      &:hover,
      &:focus {
        color: var(--text-color);
        border-color: var(--background-color);
        background: var(--background-color);
      }
    }
  }
  .vertifyInput {
    margin-bottom: 0.33rem !important;
    .el-form-item__content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-input__inner {
        width: 90%;
        box-sizing: border-box;
      }
      .identifybox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .code {
          border: 1px solid #dcdfe6;
          letter-spacing: 3px;
          float: left;
          cursor: pointer;
          width: 105px;
          height: 47px;
          text-align: center;
          vertical-align: middle;
          box-sizing: border-box;
        }
      }
    }
  }
  .form-bottom {
    .loginMsg {
      width: 70%;
      height: 47px;
      color: #f56c6c;
    }
    .findPassBtn {
      cursor: pointer;
    }
    .el-form-item__content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      &::after,
      &::before {
        display: none;
      }
    }
  }
}
</style>
