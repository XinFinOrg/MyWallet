<template>
  <div class="faqs">
    <div id="faqs" class="wrap">
      <div class="page-container">
        <div class="flex-col-vertical-bottom top-title">
          <div class="title">
            <h2>{{ $t('common.faqs') }}</h2>
            <h5>
              {{ $t('home.faqs.subtitle') }}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://howto.xinfin.org/XinFinWallet/features/"
              >
                {{ $t('home.faqs.button-see-more') }}
              </a>
            </h5>
          </div>
          <customer-support />
        </div>

        <div class="qa-cards">
          <ul class="qa__contents">
            <li v-for="prop in Object.keys(faqs)" :key="prop">
              <div class="qa__contents--title" @click="openFAQ(prop)">
                <h3>{{ $t(faqs[prop].title) }}</h3>
                <div class="show-more-buttons">
                  <div
                    :class="faqs[prop].open ? 'faq-open' : ''"
                    class="animated-button"
                  >
                    <div class="bar bar1"></div>
                    <div class="bar bar2"></div>
                  </div>
                </div>
              </div>
              <div
                :class="faqs[prop].open ? 'faq-open' : ''"
                class="qa__contents--content"
              >
                <div class="qa-text">
                  {{ $t(faqs[prop].content) }}
                  <a
                    :href="$t(faqs[prop].link)"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ $t(faqs[prop].linkText) }}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerSupport from '@/components/CustomerSupport';
export default {
  components: {
    'customer-support': CustomerSupport
  },
  data() {
    return {
      faqs: {
        faq1: {
          open: false,
          title: 'home.faqs.mew-wallet.title',
          content: 'home.faqs.mew-wallet.text',
          linkText: 'home.faqs.button-learn-more',
          link:
            'https://howto.xinfin.org/XinFinWallet/features/en/mewwallet/mewwallet-user-guide/'
        },
        faq2: {
          open: false,
          title: 'home.faqs.other-wallets.title',
          content: 'home.faqs.other-wallets.text',
          linkText: 'home.faqs.button-here',
          link:
            'https://howto.xinfin.org/XinFinWallet/features/en/getting-started/how-to-access-your-wallet/'
        },
        faq3: {
          open: false,
          title: 'home.faqs.send-txs.title',
          content: 'home.faqs.send-txs.text',
          linkText: 'home.faqs.button-here',
          link:
            'https://howto.xinfin.org/XinFinWallet/features/en/transactions/how-to-send-a-transaction/'
        },
        faq4: {
          open: false,
          title: 'home.faqs.forgot-pwd.title',
          content: 'home.faqs.forgot-pwd.text',
          linkText: 'home.faqs.button-here',
          link:
            'https://howto.xinfin.org/XinFinWallet/features/en/security-and-privacy/lost-private-key/'
        },
        faq5: {
          open: false,
          title: 'home.faqs.create-wallet.title',
          content: 'home.faqs.create-wallet.text',
          linkText: 'home.faqs.button-here',
          link:
            'https://howto.xinfin.org/XinFinWallet/features/en/getting-started/how-to-create-a-wallet/'
        }
      }
    };
  },
  methods: {
    openFAQ: function (faqToOpen) {
      this.faqs[faqToOpen].open = !this.faqs[faqToOpen].open;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'FaqsContainer.scss';
</style>
