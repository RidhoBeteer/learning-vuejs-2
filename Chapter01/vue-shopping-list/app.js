var data = {
  items: [{text: 'Banana', checked: true},
          {text: 'Laser Beam', checked: false}],
  title: 'My Shopping List',
  newItem: ''
}

new Vue({
  el: '#app',
  data: data,
  methods: {
    addItem: function() {
      var text;

      text = this.newItem.trim();
      if(text) {
        this.items.push({
          text: text,
          checked: false
        })
        this.newItem = '';
      }
    }
  }
})

