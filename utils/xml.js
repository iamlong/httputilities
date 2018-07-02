function xml_encode(str) {
    str = str.replace(/&/, "&amp;");
    str = str.replace(/</, "&lt;");
    str = str.replace(/>/, "&gt;");
    str = str.replace(/'/, "&apos;");
    str = str.replace(/"/, "&quot;");
    return str;
};

class xml_property {
    constructor(n, v) {
        this.name = n;
        this.value = v;
        this.genPropertyStr = function () {
            return " " + xml_encode(this.name) + "=\'" + xml_encode(this.value.toString()) + "\' ";
        };
    }
}

class xml_element {
    constructor(n) {
        this.name = n;
        this.properties = [];
        this.addProperty = function (p) {
            this.properties.push(p);
        }

        this.addChildElement = function (e) {
            if (typeof (this.value) == "undefined" || Array.isArray(this.value)) {
                this.value = [];
                this.value.push(e);
            }
                
        }
        this.setValue = function (v) {
            if (typeof (this.value) == "undefined" || !Array.isArray(this.value))
                this.value = v;
            else
                throw ("value is already defined as Array!")
        }
        this.genXML = function () {
            var xmlStr = "<" + xml_encode(this.name.toString());
            var propertiesStr = "";
            this.properties.forEach(item => {
                propertiesStr = propertiesStr + item.genPropertyStr();
            })
            xmlStr = xmlStr + propertiesStr + ">\n";

            if (Array.isArray(this.value)) {
                if (this.value.length === 0)
                    throw ("error: no value and sub element!")
                var childelementsStr = "";
                this.value.forEach(item => {
                    childelementsStr = childelementsStr + item.genXML() + "\n";
                })
                xmlStr = xmlStr + childelementsStr;
            } else {
                xmlStr = xmlStr + xml_encode(this.value.toString());
            }
            xmlStr = xmlStr + "</" + this.name + ">";

            return xmlStr;
        }
    }
}

module.exports = {
    xml_property,
    xml_element
};