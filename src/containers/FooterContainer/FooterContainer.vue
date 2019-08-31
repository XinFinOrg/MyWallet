<template>
  <div class="footer">
    <!-- Modal -->
    <feedback-modal />
    <div class="wrap">
      <div class="page-container">
        <div class="grid-col-1-1-1-2 footer-contents">
          <!-- <div 
            v-for="(item, index) in footerContent"
            :ref="item.class"
            :class="item.class"
            :key="item.title + index"
          >
          </div> -->
        </div>
        <div class="flex-space-between foot-note">
          <div class="links">
            <div v-for="(link, index) in lowerLinks" :key="link.title + index">
              <router-link v-if="link.hasOwnProperty('to')" :to="link.to">
                <span>{{ link.title }}</span>
              </router-link>
              <a
                v-else
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ link.title }}</span>
              </a>
            </div>
          </div>
          <div class="copyright">
            <p>
              {{ $t('footer.pricingP') }}
              <a
                href="https://coingecko.com/"
                target="_blank"
                rel="noopener noreferrer"
                >CoinGecko</a
              >
              <br />
              {{ $t('footer.copyright') }}
            </p>
          </div>
          <div class="social">
            <a
              v-for="link in links"
              :href="link.to"
              :key="link.class"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i :class="'fa ' + link.class" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FeedbackModal from '@/components/FeedbackModal';
import CustomerSupport from '@/components/CustomerSupport';
import affiliates from './affiliates.js';
const version = VERSION;

export default {
  components: {
    'feedback-modal': FeedbackModal,
    'customer-support': CustomerSupport
  },
  data() {
    return {
      version: version,
      lowerLinks: [
        {
          title: this.$t('footer.feedback'),
          href: 'mailto:support@xinfin.network'
        },
        {
          title: this.$t('footer.privacy'),
          to: '/privacy-policy'
        },
        {
          title: this.$t('common.terms'),
          to: '/terms-and-conditions'
        },
        {
          title: `v${version}`,
          href: `https://github.com/xinfinorg/Wallet/releases/tag/v${version}`
        }
      ],
      footerContent: [
        {
          class: 'e1',
          title: this.$t('footer.discover'),
          contents: [
            {
              text: this.$t('footer.units'),
              to: '/convert-units'
            },
            // {
            //   text: this.$t('footer.advanced'),
            //   to: '/advanced-tools'
            // },
            {
              text: this.$t('footer.extension'),
              href:
                'https://chrome.google.com/webstore/detail/myetherwallet/nlbmnnijcnlegkjjpcfjclmcfggfefdm?hl=en'
            },
            {
              text: 'Buy a Hardware wallet',
              to: '/hardware-wallet-affiliates'
            },
            {
              text: this.$t('footer.sendOffline'),
              to: '/send-offline-helper'
            },
            {
              text: this.$t('footer.verifyMessage'),
              to: '/verify-message'
            }
          ]
        },
        {
          class: 'e2',
          title: this.$t('footer.affiliates'),
          contents: affiliates
        },
        {
          class: 'e3',
          title: this.$t('footer.mew'),
          contents: [
            {
              text: this.$t('footer.about'),
              to: '/#about-mew'
            },
            {
              text: this.$t('footer.team'),
              to: '/team'
            },
            {
              text: this.$t('common.faqs'),
              to: '/#faqs'
            },
            {
              text: 'MEWtopia',
              href: 'https://www.mewtopia.com'
            },
            {
              text: this.$t('common.vintage'),
              href: 'https://vintage.myetherwallet.com'
            },
            {
              text: this.$t('common.customerSupport'),
              href: 'mailto:support@xinfin.network'
            },
            {
              text: 'Help Center',
              href: 'https://xinfin.network'
            }
          ]
        }
      ],
      links: [
        {
          to: 'https://www.facebook.com/XinFinHybridBlockchain/',
          class: 'fa-facebook'
        },
        {
          to: 'https://twitter.com/XinFin_Official',
          class: 'fa-twitter'
        },
        {
          to: 'https://www.instagram.com/xinfin_hybridblockchain',
          class: 'fa-instagram'
        },
        {
          to: 'https://www.linkedin.com/company/xinfin/',
          class: 'fa-linkedin'
        },
        {
          to: 'https://www.github.com/XinFinOrg',
          class: 'fa-github'
        },
        {
          to: 'https://www.reddit.com/r/xinfin/',
          class: 'fa-reddit-alien'
        },
        {
          to: 'https://medium.com/xinfin',
          class: 'fa-medium'
        }
      ]
    };
  },
  computed: {
    ...mapState(['ethDonationAddress'])
  },
  methods: {
    openFeedbackModal() {
      this.$children[0].$refs.feedback.show();
    },
    openContent(element) {
      const openButton = document.querySelector('.' + element + ' .open');
      const closeButton = document.querySelector('.' + element + ' .close');
      const content = document.querySelector('.' + element + ' .content-links');
      openButton.style.display = 'none';
      closeButton.style.display = 'block';
      content.classList.remove('mobile-hide');
    },
    closeContent(element) {
      const openButton = document.querySelector('.' + element + ' .open');
      const closeButton = document.querySelector('.' + element + ' .close');
      const content = document.querySelector('.' + element + ' .content-links');
      openButton.style.display = 'block';
      closeButton.style.display = 'none';
      content.classList.add('mobile-hide');
    },
    toggler(ref) {
      const el = this.$refs[ref][0];
      el.classList.toggle('content-open');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'FooterContainer-desktop.scss';
@import 'FooterContainer-tablet.scss';
@import 'FooterContainer-mobile.scss';
</style>
