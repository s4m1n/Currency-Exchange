<template>
  <div>
    <input type="number" class="input" v-model="date" @input="setAmount" />
    <select v-model="selected" @input="setCurrency">
      <option v-for="option in currencyOptions" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CurrencyRow',
  props: ['currencyOptions', 'selectedCurrency', 'amount'],
  data() {
    return {
      selected: this.selectedCurrency,
      rate: this.amount
    };
  },
  computed: {
    date: {
      get: function() {
        return this.amount;
      },
      set: function(value) {
        this.rate = value;
      }
    }
  },
  methods: {
    setAmount: function(e) {
      this.$emit('setAmount', e.target.value);
      // this.$store.dispatch("setAmount", e.target.value);
    },
    setCurrency: function(e) {
      this.$emit('setCurrency', e.target.value);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
