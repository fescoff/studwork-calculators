import { shallowMount, mount } from '@vue/test-utils';

import SwSelect from './index.vue';
import SimpleDropdownItem from './simple-dropdown-item';

jest.useFakeTimers();

const getWrapper = (propsData = {}) => mount(SwSelect, {
  propsData,
  stubs: ['SwImg', 'SwInput', 'AngleUpIcon', 'AngleDownIcon'],
  directives: {
    ['click-outside']: {},
  },
})

describe('Global component SwSelect', () => {
  describe('Count of elems::prop options', () => {
    const wrapper = getWrapper({
      options: [],
      value: null,
    });

    const getElemsCount = (count) => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push({
          id: i,
          name: `test_${i}`,
        });
      }
      return result;
    };

    it('Show 3 elems in dropdown', async () => {
      await wrapper.setProps({
        options: getElemsCount(3),
      });

      expect(wrapper.findAll('label.item').length).toBe(3);
    });

    it('Show 0 elems in dropdown', async () => {
      await wrapper.setProps({
        options: [],
      });

      expect(wrapper.findAll('label.item').length).toBe(0);
    });

    it('Show 15 elems in dropdown', async () => {
      await wrapper.setProps({
        options: getElemsCount(15),
      });

      expect(wrapper.findAll('label.item').length).toBe(15);
    });
  });

  describe('Show right label::prop value', () => {
    const options = [
      {
        id: 0,
        label: '0',
      },
      {
        id: 1,
        label: 'test2',
      },
      {
        id: 2,
        label: 'foobar',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
    });

    const mainInput = wrapper.find('input.input').element;

    it('Input is empty', () => {
      expect(mainInput.value).toBe('');
    });

    it('Value in input "test2"', async () => {
      await wrapper.setProps({
        value: options[1],
      });

      expect(mainInput.value).toBe('test2');
    });

    it('Value in input "foobar"', async () => {
      await wrapper.setProps({
        value: options[2],
      });

      expect(mainInput.value).toBe('foobar');
    });

    it('Value in input empty', async () => {
      await wrapper.setProps({
        value: null,
      });

      expect(mainInput.value).toBe('');
    });
  });

  describe('Show right label with custom selectedLabel::prop selectedLabel', () => {
    const options = [
      {
        id: 0,
        foo: '0',
      },
      {
        id: 1,
        foo: 'test2',
      },
      {
        id: 2,
        foo: 'foobar',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
      selectedLabel: 'foo',
    });

    const mainInput = wrapper.find('input.input').element;

    it('Input is empty', () => {
      expect(mainInput.value).toBe('');
    });

    it('Value in input "test2"', async () => {
      await wrapper.setProps({
        value: options[1],
      });

      expect(mainInput.value).toBe('test2');
    });

    it('Value in input "foobar"', async () => {
      await wrapper.setProps({
        value: options[2],
      });

      expect(mainInput.value).toBe('foobar');
    });

    it('Value in input empty', async () => {
      await wrapper.setProps({
        value: null,
      });

      expect(mainInput.value).toBe('');
    });
  });

  describe('Prop placeholder and canBeEmpty', () => {
    const wrapper = getWrapper({
      options: [
        {
          id: 0,
          label: 'bla',
        },
      ],
      value: null,
      placeholder: 'placeholder',
    });

    const mainInput = wrapper.find('input.input').element;
    const getEmpty = () => wrapper.find('label.disabled.item > span');

    it('Show placeholder in input', () => {
      expect(mainInput.placeholder).toBe('placeholder');
    });

    it('Show another placeholder', async () => {
      await wrapper.setProps({
        placeholder: 'foobar',
      });

      expect(mainInput.placeholder).toBe('foobar');
    });

    it('Show empty label', async () => {
      await wrapper.setProps({
        canBeEmpty: true,
      });

      expect(mainInput.placeholder).toBe('foobar');
      expect(getEmpty().exists()).toBe(true);
      expect(getEmpty().text()).toBe('foobar');
    });

    it('Change placeholder and check emptyLabel', async () => {
      await wrapper.setProps({
        placeholder: 'barfoo',
      });

      expect(mainInput.placeholder).toBe('barfoo');
      expect(getEmpty().exists()).toBe(true);
      expect(getEmpty().text()).toBe('barfoo');
    });
  });

  describe('Prop searchable', () => {
    const options = [
      {
        id: 0,
        name: 'blabla',
      },
      {
        id: 1,
        name: 'blater',
      },
      {
        id: 2,
        name: 'search',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
      searchable: true,
    });

    const mainInput = wrapper.find('input.input');

    it('Show all options with empty search', () => {
      expect(wrapper.findAll('label.item').length).toBe(3);
    });

    it('Show only one elem', async () => {
      await mainInput.setValue('blabla');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').length).toBe(1);
    });

    it('Not show elems', async () => {
      await mainInput.setValue('bsdsadsadasdsadlabla');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').exists()).toBe(false);
    });

    it('Show 2 elems', async () => {
      await mainInput.setValue('bla');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').length).toBe(2);
    });
  });

  describe('Prop searchKeys', () => {
    const options = [
      {
        id: 0,
        foobar: 'blabla',
        nested: { name: 'blabla' }
      },
      {
        id: 1,
        foobar: 'blater',
        nested: { name: 'blater' },
      },
      {
        id: 2,
        foobar: 'search',
        nested: { name: 'search' },
      },
    ];
    const multilevelOptions = [
      {
        id: 0,
        foo: 'bar',
        list: [
          {
            id: 0,
            foo: 'bar',
            bar: [
              { name: 'one' },
              { name: 'two' }
            ]
          }
        ]
      },
      {
        id: 1,
        foo: 'baz',
        list: [
          {
            id: 1,
            foo: 'baz',
            bar: [
              { name: 'three' },
              { name: 'four' },
            ]
          }
        ]
      }
    ]

    const wrapper = getWrapper({
      options,
      value: null,
      searchable: true,
      searchKeys: 'foobar',
    });

    const mainInput = wrapper.find('input.input');

    it('Show all options with empty search', () => {
      expect(wrapper.findAll('label.item').length).toBe(3);
    });

    it('Show only one elem', async () => {
      await mainInput.setValue('blabla');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').length).toBe(1);
    });

    it('Not show elems', async () => {
      await mainInput.setValue('bsdsadsadasdsadlabla');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').exists()).toBe(false);
    });

    it('Show 2 elems', async () => {
      await mainInput.setValue('bla');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').length).toBe(2);
    });

    it('Nested key', async () => {
      await wrapper.setProps({
        searchKeys: 'nested.name',
      });
      await mainInput.setValue('search');

      jest.runAllTimers();

      expect(wrapper.findAll('label.item').length).toBe(1);
    });

    it('Multilevel search', async () => {
      await wrapper.setProps({
        options: multilevelOptions,
        multilevel: true,
        subListLabel: 'list',
        searchKeys: 'foo',
        label: 'foo',
      });
      await mainInput.setValue('ba');

      jest.runAllTimers();

      const labels = wrapper.findAll('label.item');

      expect(labels.length).toBe(2);
      expect(labels.at(0).text()).toBe('bar');
      expect(labels.at(1).text()).toBe('baz');
    });

    it('Nested multilevel key', async () => {
      await wrapper.setProps({
        searchKeys: 'bar.name',
      });
      await mainInput.setValue('four');

      jest.runAllTimers();

      const labels = wrapper.findAll('label.item');

      expect(labels.length).toBe(1);
      expect(labels.at(0).text()).toBe('baz');
    });
  });

  describe('Prop trackBy', () => {
    const options = [
      {
        id: 0,
        name: 'name0',
        uid: 1,
        uuid: 2,
        foo: {
          id: 4,
        },
      },
      {
        id: 1,
        name: 'name1',
        uid: 0,
        uuid: 2,
        foo: {
          id: 5,
        },
      },
    ];

    const wrapper = getWrapper({
      options,
      value: options[0],
      label: 'name',
    });

    it('Right active elem in list', () => {
      const labelsElems = wrapper
        .findAll('label.item')
        .wrappers.map((wrp) => wrp.element);
      const activeLabelElem = wrapper.find('label.item.active').element;

      expect(labelsElems.includes(activeLabelElem)).toBeTruthy();
      expect(labelsElems.indexOf(activeLabelElem)).toBe(0);
    });

    it('Set not default', async () => {
      await wrapper.setProps({ trackBy: 'uid' });

      const labelsElems = wrapper
        .findAll('label.item')
        .wrappers.map((wrp) => wrp.element);
      const activeLabelElem = wrapper.find('label.item.active').element;

      expect(labelsElems.includes(activeLabelElem)).toBeTruthy();
      expect(labelsElems.indexOf(activeLabelElem)).toBe(0);
    });

    it('Set not uniq id', async () => {
      await wrapper.setProps({ trackBy: 'uuid' });

      expect(wrapper.findAll('label.item').length).toBe(2);
      expect(wrapper.findAll('label.item.active').length).toBe(2);
    });

    it('Set function trackBy', async () => {
      await wrapper.setProps({ trackBy: ({ foo }) => foo.id, value: options[1] });

      const labelsElems = wrapper
        .findAll('label.item')
        .wrappers.map((wrp) => wrp.element);
      const activeLabelElem = wrapper.find('label.item.active').element;

      expect(labelsElems.includes(activeLabelElem)).toBeTruthy();
      expect(labelsElems.indexOf(activeLabelElem)).toBe(1);
    });

    it('Set nested trackBy', async () => {
      await wrapper.setProps({ trackBy: 'foo.id' });

      const labelsElems = wrapper
        .findAll('label.item')
        .wrappers.map((wrp) => wrp.element);
      const activeLabelElem = wrapper.find('label.item.active').element;

      expect(labelsElems.includes(activeLabelElem)).toBeTruthy();
      expect(labelsElems.indexOf(activeLabelElem)).toBe(1);
    });
  });

  describe('Prop optionIcon', () => {
    const options = [
      {
        id: 0,
        name: 'name0',
        icon: 'icon1',
      },
      {
        id: 1,
        name: 'name1',
        icon: 'icon2',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
    });

    it('Not show icon when prop null', () => {
      const iconWrappers = wrapper.findAll('.item__icon');

      expect(iconWrappers.length).toBe(0);
    });

    it('Show icons in non-multilevel dropdown', async () => {
      await wrapper.setProps({ optionIcon: 'icon' });

      const iconWrappers = wrapper.findAll('.item__icon');

      expect(iconWrappers.length).toBe(2);

      expect(iconWrappers.at(0).attributes('src')).toBe('icon1');
      expect(iconWrappers.at(1).attributes('src')).toBe('icon2');
    });

    it('Show right icon in value', async () => {
      await wrapper.setProps({ value: options[0] });

      const iconWrapper = wrapper.find('input.input + .item__icon');

      expect(iconWrapper.exists()).toBeTruthy();
      expect(iconWrapper.attributes('src')).toBe('icon1');
    });
  });

  describe('Prop optionIconType', () => {
    const options = [
      {
        id: 0,
        name: 'name0',
        icon: 'icon1',
      },
      {
        id: 1,
        name: 'name1',
        icon: 'icon2',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
      optionIcon: 'icon',
    });
  });

  describe('Option delimiters', () => {
    const options = [
      {
        id: 0,
        delimiter: true,
      },
      {
        id: 1,
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
    });

    it('Show delimiter', () => {
      expect(wrapper.findAll('.item__delimiter').length).toBe(1);
    });

    it('Show 2 delimiters', async () => {
      options[1].delimiter = true;
      await wrapper.setProps({ options: options.concat() });

      expect(wrapper.findAll('.item__delimiter').length).toBe(2);
    });

    it('Not show delimiter', async () => {
      delete options[0].delimiter;
      delete options[1].delimiter;
      await wrapper.setProps({ options: options.concat() });

      expect(wrapper.findAll('.item__delimiter').exists()).toBeFalsy();
    });
  });

  describe('Option disabled', () => {
    const options = [
      {
        id: 0,
        disabled: true,
      },
      {
        id: 1,
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
    });

    it('One option disabled', () => {
      expect(wrapper.findAll('.item__check[disabled]').length).toBe(1);
    });

    it('2 options disabled', async () => {
      options[1].disabled = true;
      await wrapper.setProps({ options: options.concat() });

      expect(wrapper.findAll('.item__check[disabled]').length).toBe(2);
    });

    it('Zero options disabled', async () => {
      delete options[0].disabled;
      delete options[1].disabled;
      await wrapper.setProps({ options: options.concat() });

      expect(wrapper.findAll('.item__check[disabled]').exists()).toBeFalsy();
    });
  });

  describe('Item label content without multilevel', () => {
    const options = [
      {
        id: 0,
        label: '0',
        labelCustom: 'foo',
      },
      {
        id: 1,
        label: 'test2',
      },
      {
        id: 2,
        label: 'foobar',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
    });

    it('Right option label', () => {
      const label = wrapper.find('.item__label');

      expect(label.text()).toBe('0');
    });

    it('Right option label with custom label', async () => {
      await wrapper.setProps({ label: 'labelCustom' });

      const label = wrapper.find('.item__label');

      expect(label.text()).toBe('foo');
    });
  });

  describe('Prop multilevel and subListLabel', () => {
    const options = [
      {
        id: 0,
        label: '0',
        labelCustom: 'foo',
        sub: [
          {
            id: 0,
            label: 'sub1',
            labelCustom: 'sub11',
          },
          {
            id: 1,
            label: 'sub2',
            labelCustom: 'sub12',
          },
        ],
        customSub: [
          {
            id: 0,
            labelCustom: 'customsub',
            icon: 'test',
          },
        ],
      },
      {
        id: 1,
        label: 'test2',
        labelCustom: 'foo1',
        sub: [
          {
            id: 0,
            label: 'sub3',
            labelCustom: 'sub13',
          },
        ],
      },
      {
        id: 2,
        label: 'foobar',
        labelCustom: 'foo2',
      },
    ];

    const wrapper = getWrapper({
      options,
      value: null,
      multilevel: true,
      subListLabel: 'sub',
      optionIcon: 'icon',
    });

    it('Count of main and sublist elems', () => {
      const mainOptions = wrapper.findAll('.multilevel-dropdown-item');
      const subOptions = wrapper.findAll('.item.multilevel-dropdown-item__item');

      expect(mainOptions.length).toBe(3);
      expect(subOptions.length).toBe(3);
    });

    it('Title of sublists', () => {
      const sublistTitles = wrapper.findAll('.multilevel-dropdown-item__label');

      expect(sublistTitles.at(0).text()).toBe('0');
      expect(sublistTitles.at(1).text()).toBe('test2');
      expect(sublistTitles.at(2).text()).toBe('foobar');
    });

    it('Label of sublist elems', () => {
      const subOptions = wrapper.findAll('.item.multilevel-dropdown-item__item');

      expect(subOptions.at(0).text()).toBe('sub1');
      expect(subOptions.at(1).text()).toBe('sub2');
      expect(subOptions.at(2).text()).toBe('sub3');
    });

    it('Change label', async () => {
      await wrapper.setProps({ label: 'labelCustom' });

      const sublistTitles = wrapper.findAll('.multilevel-dropdown-item__label');

      expect(sublistTitles.at(0).text()).toBe('foo');
      expect(sublistTitles.at(1).text()).toBe('foo1');
      expect(sublistTitles.at(2).text()).toBe('foo2');

      const subOptions = wrapper.findAll('.item.multilevel-dropdown-item__item');

      expect(subOptions.at(0).text()).toBe('sub11');
      expect(subOptions.at(1).text()).toBe('sub12');
      expect(subOptions.at(2).text()).toBe('sub13');
    });

    it('Change subListLabel', async () => {
      await wrapper.setProps({ subListLabel: 'customSub' });

      const subOptions = wrapper.findAll('.item.multilevel-dropdown-item__item');

      expect(subOptions.at(0).text()).toBe('customsub');
      expect(subOptions.length).toBe(1);
    });
  });

  describe('Toggle dropdown', () => {
    const wrapper = getWrapper({
      options: [
        {
          id: 0,
        }
      ],
      value: null,
    });

    const mainInput = wrapper.find('input.input');
    const dropdown = wrapper.find('.dropdown');

    it('Default dropdown closed', () => {
      expect(dropdown.isVisible()).toBeFalsy();
    });

    it('Open on click', async () => {
      await mainInput.trigger('click');

      expect(mainInput.exists()).toBeTruthy();
      expect(dropdown.isVisible()).toBeTruthy();
    });
  });

  describe('Prop isPropValue', () => {
    const options = [
      {
        id: 0,
        label: 'Россия',
        sublist: [
          {
            id: 100,
            label: 'Москва',
          },
          {
            id: 101,
            label: 'Санкт-Петербург',
          },
        ],
      },
      {
        id: 1,
        label: 'Франция',
        sublist: [
          {
            id: 102,
            label: 'Париж',
          },
        ],
      },
    ];

    const wrapper = getWrapper({
      value: 0,
      options,
      isPropValue: true,
    });

    it('Simple list', async () => {
      const mainInput = wrapper.find('input.input');

      expect(mainInput.element.value).toBe('Россия');

      await wrapper.setProps({ value: 1 });

      expect(mainInput.element.value).toBe('Франция');
    });

    it('Multilevel list', async () => {
      await wrapper.setProps({
        value: 100,
        multilevel: true,
        subListLabel: 'sublist',
      });

      const mainInput = wrapper.find('input.input');

      expect(mainInput.element.value).toBe('Москва');

      await wrapper.setProps({ value: 102 });

      expect(mainInput.element.value).toBe('Париж');
    });

    it('Set zero id', async () => {
      await wrapper.setProps({
        value: 1,
        multilevel: false,
      });

      const dropdownItem = wrapper.findComponent(SimpleDropdownItem);

      dropdownItem.vm.$emit('input', 0);

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('input')[0]).toStrictEqual([0]);
    })
  });
});
