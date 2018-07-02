const xml = require('../utils/xml');

const xmlelement = new xml.xml_element('test');

//xmlelement.setValue("abcd<>;'\"&efg");

var child = new xml.xml_element("child1");
var childchild = new xml.xml_element("childchild");
childchild.setValue("childchild");
var property = new xml.xml_property("property1<>", "value1");
childchild.addProperty(property);
property = new xml.xml_property("property2", "value2<>");
child.addProperty(property);
childchild.addProperty(property);
child.addChildElement(childchild);
xmlelement.addChildElement(child);

console.log(xmlelement.genXML());
