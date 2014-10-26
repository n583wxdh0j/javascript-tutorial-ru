function Menu(options) {
  var elem;
  var self = this;

  for(var method in EventMixin) {
    this[method] = EventMixin[method]
  }

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    var elemHtml = options.template({title: options.title});

    elem = $(elemHtml);

    elem.on('mousedown selectstart', false);

    elem.on('click', '.title', onTitleClick);
    elem.on('click', 'a', onItemClick)
  }


  function renderItems() {
    if (elem.find('ul').length) return;
    
    var listHtml = options.listTemplate({items: options.items});
    elem.append(listHtml);
  }

  function onItemClick(e) {
    e.preventDefault();

    self.trigger('select', e.currentTarget.getAttribute('href').slice(1));
  }

  function onTitleClick(e) {
    toggle();
  }

  function open() {
    renderItems();
    elem.addClass('open');
  };

  function close() {
    elem.removeClass('open');
  };

  function toggle() {
    if (elem.hasClass('open')) close();
    else open();
  };

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}