<script>
import { mapMutations } from 'vuex';
import handlerAnalytics from './handlers/handlerAnalytics.mixin';

export default {
  mixins: [handlerAnalytics],
  data() {
    return {};
  },
  methods: {
    ...mapMutations('popups', ['NEVER_SHOW_TRACKING'])
    /**
     * Sets the tracking consent and
     * then never displays the dialog again
     */
  }
};
</script>

<style lang="scss">
.matomo-analytics-dialog {
  &.position-right {
    position: absolute !important;
    top: 16px !important;
    right: 16px !important;
  }

  .v-expansion-panel-content__wrap {
    padding: 0 0 32px 0 !important;
  }
}
</style>

<style lang="scss" scoped>
.inner-container {
  background-color: white;
  border-top: 8px solid var(--v-greenPrimary-base);
}
</style>
