<template lang="html">
  <div class="claim-dns-container">
    <div class="claim-dns-content">
      <h3>{{ $t('ens.claim.cheers') }}</h3>
      <p>{{ $t('ens.claim.domain-claimable', { domain: fullDomainName }) }}</p>
      <p>{{ $t('ens.claim.owner-set', { owner: dnsOwner }) }}</p>
      <div class="claim-dns-button">
        <button
          :class="[
            'large-round-button-green-filled',
            loading ? 'disabled' : ''
          ]"
          @click="claimFunc"
        >
          <span v-show="!loading">
            {{ $t('ens.claim.string') }}
          </span>
          <i v-show="loading" class="fa fa-spinner fa-spin" />
        </button>
      </div>
    </div>
    <interface-bottom-text
      :link-text="$t('common.help-center')"
      :question="$t('common.have-issues')"
      link="https://howto.xinfin.org/XinFinWallet/features"
    />
  </div>
</template>

<script>
import InterfaceBottomText from '@/components/InterfaceBottomText';

export default {
  components: {
    'interface-bottom-text': InterfaceBottomText
  },
  props: {
    hostName: {
      type: String,
      default: ''
    },
    dnsOwner: {
      type: String,
      default: ''
    },
    claimFunc: {
      type: Function,
      default: function () {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    tld: {
      type: String,
      default: ''
    }
  },
  computed: {
    fullDomainName() {
      return `${this.hostName}.${this.tld}`;
    }
  },
  mounted() {
    if (this.hostName === '') {
      this.$router.push('/interface/dapps/manage-ens');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'ClaimDNSContainer.scss';
</style>
