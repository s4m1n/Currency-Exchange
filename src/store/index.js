import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyOptions: null,
    fromCurrency: '',
    toCurrency: '',
    exchangeRate: null,
    amount: 1,
    amountInFromCurrency: true,
    fromAmount: null,
    toAmount: null,
    from: null,
    to: null
  },
  getters: {
    currencyOptions: state => state.currencyOptions,
    fromCurrency: state => state.fromCurrency,
    toCurrency: state => state.toCurrency,
    exchangeRate: state => state.exchangeRate,
    amount: state => state.amount,
    amountInFromCurrency: state => state.amountInFromCurrency,
    fromAmount: state => state.fromAmount,
    toAmount: state => state.toAmount,
    from: state => state.from,
    to: state => state.to
  },
  mutations: {
    fetchRates: (state, payload) => {
      state.currencyOptions = [
        payload.base,
        ...Object.keys(payload.rates)
      ].sort();
      const firstCurrency = Object.keys(payload.rates).sort()[0];
      state.toCurrency = firstCurrency;
      state.fromCurrency = payload.base;
      state.exchangeRate = payload.rates[firstCurrency];
      if (state.amountInFromCurrency) {
        state.fromAmount = state.amount;
        state.toAmount = state.amount * state.exchangeRate;
        state.from = state.fromAmount;
        state.to = state.toAmount;
      } else {
        state.toAmount = state.amount;
        state.fromAmount = state.amount / state.exchangeRate;
      }
    },
    setAmount: (state, payload) => {
      state.amount = payload.amount;
      if (payload.amountInFromCurrency) {
        state.fromAmount = state.amount;
        state.toAmount = state.amount * state.exchangeRate;
      } else {
        state.toAmount = state.amount;
        state.fromAmount = state.amount / state.exchangeRate;
      }
      // state.fromAmount = state.amount;
      // state.toAmount = state.amount * state.exchangeRate;
      // state.amountInFromCurrency = false;
    },
    setCurrency: (state, payload) => {
      if (payload.payload.amountInFromCurrency) {
        state.exchangeRate = payload.response.rates[payload.payload.toCurrency];
        state.fromCurrency = payload.payload.currency;
        state.toAmount = state.amount * state.exchangeRate;
      } else {
        state.exchangeRate = payload.response.rates[payload.payload.currency];
        state.toCurrency = payload.payload.currency;
        state.toAmount = state.amount * state.exchangeRate;
      }
    }
  },
  actions: {
    fetchRates({ commit }) {
      axios.get('https://api.exchangeratesapi.io/latest').then(res => {
        commit('fetchRates', res.data);
      });
    },
    setAmount(context, payload) {
      context.commit('setAmount', payload);
    },
    setCurrency({ commit }, payload) {
      if (payload.amountInFromCurrency) {
        axios
          .get(
            `https://api.exchangeratesapi.io/latest?base=${payload.currency}&symbols=${payload.toCurrency}`
          )
          .then(res => {
            commit('setCurrency', { payload, response: res.data });
          });
      } else {
        axios
          .get(
            `https://api.exchangeratesapi.io/latest?base=${payload.fromCurrency}&symbols=${payload.currency}`
          )
          .then(res => {
            commit('setCurrency', { payload, response: res.data });
          });
      }
    }
  },
  modules: {}
});
