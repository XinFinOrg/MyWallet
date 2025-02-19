<template>
  <div class="interface-address">
    <div class="info-block address">
      <div class="block-image">
        <blockie
          :address="newAddress"
          :size="8"
          :scale="16"
          width="64px"
          height="64px"
          class="blockie-image"
        />
        <input
          ref="copyAddress"
          :value="newAddress"
          class="hidden-input"
          autocomplete="off"
        />
      </div>
      <div class="block-content">
        <div class="information-container">
          <h2>{{ $t('common.addr') }}</h2>
          <p class="address">{{ newAddress }}</p>
        </div>
        <div class="icon-container">
          <button
            v-if="hasMultipleAddr"
            id="popover-ref-switch"
            class="change-button"
            @click="switchAddr"
          >
            {{ $t('interface.addr.button-switch') }}
          </button>
          <b-btn id="popover-ref-qrcode" class="custom-tooltip" @click="qrcode">
            <img alt src="~@/assets/images/icons/qr-code-white.svg" />
          </b-btn>
          <b-btn id="popover-ref-print" class="custom-tooltip" @click="print">
            <img alt src="~@/assets/images/icons/printer-white.svg" />
          </b-btn>
          <b-btn id="popover-ref-copy" class="custom-tooltip" @click="copy">
            <img alt src="~@/assets/images/icons/copy.svg" />
          </b-btn>
          <b-btn
            v-show="displayAddr"
            id="popover-ref-address"
            class="custom-tooltip button-address"
            @click="displayAddr"
          >
            <img
              alt
              src="~@/assets/images/icons/Interface/Buttons/Address.svg"
            />
          </b-btn>
          <b-popover
            :content="$t('popover.addr-switch')"
            target="popover-ref-address"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('popover.print')"
            target="popover-ref-print"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('common.copy')"
            target="popover-ref-copy"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('popover.addr-switch')"
            target="popover-ref-switch"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('popover.addr-display')"
            target="popover-ref-address"
            placement="top"
            triggers="hover"
            title
          />
          <b-popover
            :content="$t('popover.addr-qr')"
            target="popover-ref-qrcode"
            placement="top"
            triggers="hover"
            title
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blockie from '@/components/Blockie';
import { mapState } from 'vuex';
import { Toast } from '@/helpers';
import {
  KEYSTORE,
  PRIV_KEY,
  MEW_CONNECT,
  WEB3_WALLET
} from '@/wallets/bip44/walletTypes';

export default {
  components: {
    blockie: Blockie
  },
  props: {
    address: {
      type: String,
      default: ''
    },
    print: {
      type: Function,
      default: function () {}
    },
    switchAddr: {
      type: Function,
      default: function () {}
    },
    displayAddr: {
      type: Function,
      default: undefined
    },
    qrcode: {
      type: Function,
      default: function () {}
    }
  },
  data() {
    return {
      hasMultipleAddr: false,
      newAddress: "xdc" + this.$props.address.substring(2),

    };
  },
  computed: {
    ...mapState('main', ['account'])
  },
  mounted() {
    if (this.account.address !== null) {
      if (
        this.account.identifier !== KEYSTORE &&
        this.account.identifier !== PRIV_KEY &&
        this.account.identifier !== MEW_CONNECT &&
        this.account.identifier !== WEB3_WALLET
      ) {
        this.hasMultipleAddr = true;
      } else {
        this.hasMultipleAddr = false;
      }
    }
  },
  methods: {
    copy() {
      this.$refs.copyAddress.select();
      document.execCommand('copy');
      Toast.responseHandler(this.$t('common.copied'), Toast.INFO);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'InterfaceAddress.scss';
</style>
