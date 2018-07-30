const xml = require('../utils/xml');

const xmlelement = new xml.xml_element('test');

//xmlelement.setValue("abcd<>;'\"&efg");

var child = new xml.xml_element("child1");
var childchild = new xml.xml_element("childchild");
var child2 = new xml.xml_element("child2");
child2.setValue("child2");
childchild.setValue("childchild");
var property = new xml.xml_property("property1< >", "value1");
childchild.addProperty(property);
childchild.addProperty('abc', 'abc');
property = new xml.xml_property("property2", "value2< >");
child.addProperty(property);
childchild.addProperty(property);
child.addChildElement(childchild);
xmlelement.addChildElement(child);
xmlelement.addChildElement(child2);

console.log(xmlelement.genXML());
