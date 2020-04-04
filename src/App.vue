<template>
  <div id="app">
    <div class="navbar bg-primary">
      <h1 class="heading">
        <i class="fas fa-coins" style="margin-right: 0.25rem"></i>Currency Exchange
      </h1>
    </div>
    <div v-if="toCurrency || fromCurrency" class="container">
      <h1 class="conversion">
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
import CurrencyRow from "./components/CurrencyRow";

export default {
  name: "App",
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
      this.$store.dispatch("fetchRates");
    },
    amountOne: function(value) {
      const payload = {
        amount: value,
        amountInFromCurrency: this.row1
      };
      this.$store.dispatch("setAmount", payload);
    },
    amountTwo: function(value) {
      const payload = {
        amount: value,
        amountInFromCurrency: this.row2
      };
      this.$store.dispatch("setAmount", payload);
    },
    rowOneCurrency: function(value) {
      const payload = {
        currency: value,
        amountInFromCurrency: this.row1,
        toCurrency: this.toCurrency
      };
      this.$store.dispatch("setCurrency", payload);
    },
    rowTwoCurrency: function(value) {
      const payload = {
        currency: value,
        amountInFromCurrency: this.row2,
        fromCurrency: this.fromCurrency
      };
      this.$store.dispatch("setCurrency", payload);
    }
  },
  created() {
    this.fetchRates();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500&display=swap");
/* body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: cornsilk;
} */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Baloo Bhai 2", cursive;
  font-size: 1rem;
  line-height: 1.6;
  background: #3e5151; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #decba4,
    #3e5151
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #decba4,
    #3e5151
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #333;
}
.heading {
  color: cornsilk;
}
.conversion {
  color: #3c3b3f;
  margin-bottom: 1rem;
}
.bg-primary {
  background: #3c3b3f;
  color: #fff;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  z-index: 1;
  width: 100%;
  opacity: 0.9;
  margin-bottom: 1rem;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  padding: 0 2rem;
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
