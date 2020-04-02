<template>
  <div id="app">
    <div v-if="toCurrency || fromCurrency">
      <h1>
        {{ from }} {{ fromCurrency }} equals to {{ exchangeRate }}
        {{ toCurrency }}
      </h1>
      <currency-row
        :currencyOptions="currencyOptions"
        :selectedCurrency="fromCurrency"
        :amount="fromAmount"
        @setCurrency="rowOneCurrency"
        @setAmount="amountOne"
      />
      <div class="equals">=</div>
      <currency-row
        :currencyOptions="currencyOptions"
        :selectedCurrency="toCurrency"
        :amount="toAmount"
        @setCurrency="rowTwoCurrency"
        @setAmount="amountTwo"
      />
    </div>
  </div>
</template>

<script>
import CurrencyRow from './components/CurrencyRow';
export default {
  name: 'App',
  data() {
    return {
      row1: true,
      row2: false
    };
  },
  components: {
    CurrencyRow
  },

  computed: {
    amount: function() {
      return this.$store.getters.amount;
    },
    currencyOptions: function() {
      return this.$store.getters.currencyOptions;
    },
    fromCurrency: function() {
      return this.$store.getters.fromCurrency;
    },
    toCurrency: function() {
      return this.$store.getters.toCurrency;
    },
    exchangeRate: function() {
      return this.$store.getters.exchangeRate;
    },
    amountInFromCurrency: function() {
      return this.$store.getters.amountInFromCurrency;
    },
    fromAmount: function() {
      return this.$store.getters.fromAmount;
    },
    toAmount: function() {
      return this.$store.getters.toAmount;
    },
    from: function() {
      return this.$store.getters.from;
    },
    to: function() {
      return this.$store.getters.to;
    }
  },
  methods: {
    fetchRates: function() {
      this.$store.dispatch('fetchRates');
    },
    amountOne: function(value) {
      const payload = {
        amount: value,
        amountInFromCurrency: this.row1
      };
      this.$store.dispatch('setAmount', payload);
    },
    amountTwo: function(value) {
      const payload = {
        amount: value,
        amountInFromCurrency: this.row2
      };
      this.$store.dispatch('setAmount', payload);
    },
    rowOneCurrency: function(value) {
      const payload = {
        currency: value,
        amountInFromCurrency: this.row1,
        toCurrency: this.toCurrency
      };
      this.$store.dispatch('setCurrency', payload);
    },
    rowTwoCurrency: function(value) {
      const payload = {
        currency: value,
        amountInFromCurrency: this.row2,
        fromCurrency: this.fromCurrency
      };
      this.$store.dispatch('setCurrency', payload);
    }
    // amountCalculation: function() {
    //   if (this.amountInFromCurrency) {
    //     this.fromAmount = this.amount;
    //     this.toAmount = this.amount * this.exchangeRate;
    //   } else {
    //     this.toAmount = this.amount;
    //     this.fromAmount = this.amount / this.exchangeRate;
    //   }
    // }
  },
  created() {
    this.fetchRates();
  }
};
</script>

<style>
body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  background-color: cornsilk;
}

h1 {
  margin: 0;
  margin-bottom: 2rem;
  color: darkslategrey;
}
.input {
  border: 1px solid #333;
  border-radius: 0.3em;
  padding: 0.25rem;
  width: 10em;
}
select {
  margin-left: 0.5rem;
  border: 1px solid #333;
  border-radius: 0.3em;
  padding: 0.25rem;
  width: 10em;
}
.equals {
  font-weight: bold;
  font-size: 2rem;
}
</style>
