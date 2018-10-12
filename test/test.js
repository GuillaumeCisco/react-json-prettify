import React from 'react';
import 'jsdom-global/register';
import {configure, shallow, mount} from 'enzyme';
import {expect} from 'chai';
import JSONPretty from '../src';
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

const json = {
    name: 'John Doe',
    age: 20,
    admin: true,
    member: null,
    permissions: ['read', 'write', 'edit'],
    deep: [
        {
            a: {
                b: {
                    c: null,
                    d: ['e', 'f', [1, null]],
                },
            },
        },
    ],
};

describe('JSONPretty', function () {
    it('should create component with pre as first tag', function () {
        const wrapper = shallow(<JSONPretty/>);
        expect(wrapper.find('pre')).to.have.length(1);
    });

    it('should have a default padding to 2', function () {
        const wrapper = mount(<JSONPretty/>);

        expect(wrapper.props().padding).to.equal(2);
    });

    it('should have a padding to 4', function () {
        const wrapper = mount(<JSONPretty/>);

        wrapper.setProps({padding: 4});
        expect(wrapper.props().padding).to.equal(4);
    });

    it('should correctly render a complex json', function () {
        const wrapper = mount(<JSONPretty json={json}/>);

        expect(wrapper.props().json).to.equal(json);
    });
});