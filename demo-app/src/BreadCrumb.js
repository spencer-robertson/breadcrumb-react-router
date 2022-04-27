import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router";
import React, { useContext } from 'react';

const BreadCrumbContext = React.createContext({breadCrumb: '', setBreadCrumb: () => {}});

export const useBreadCrumb = () => {
    const { breadCrumb } = useContext(BreadCrumbContext);

    return breadCrumb

}

export class BreadCrumbRouter extends Router {
    constructor(props) {
        super(props);
        this.state = {breadCrumb: '', setBreadCrumb: () => {}}
      }

    
	/* Rendering the original Route component */
	render() {
        const breadCrumb= this.state.breadCrumb
        const setBreadCrumb = this.setState({breadCrumb})
		return super.render(<BreadCrumbContext.Provider value={{ breadCrumb, setBreadCrumb }}>
      </BreadCrumbContext.Provider>);
	}
}

export class BreadCrumbRoute extends Route {
    static contextType = BreadCrumbContext;

    constructor(props) {
		super(props);
        this.generateName = props.generateName
	}

	componentDidMount() {
        this.generateBreadCrumbs(this.props)
	}

	componentWillReceiveProps(nextProps) {
		this.generateBreadCrumbs(nextProps)
	}

    generateBreadCrumbs(props) {
        const path = this.splitPath(props.computedMatch.path)
        const formattedPath = path.map((param) => {
            if(param.includes(":")) {
                return this.replaceParams(param.replace(":", ""), props.computedMatch.params, props.generateName)
            }
            return param;
        })
        console.log("generateBreadCrumbs ~ setBreadCrumb", this.context);
        console.log("formattedPath ~ formattedPath", formattedPath);
        this.context.setBreadCrumb(formattedPath)
    }

	splitPath(path) {
		const url = path.split(`/`);
        url.shift();
		return url;
	}

    /* If the user specifies a custom param -> name generation 
    apply this else just return the param value*/
    replaceParams(param, params, generateName) {
        return generateName ? generateName(params[param]) : params[param]
	}

	/* Rendering the original Route component */
	render() {
		return super.render();
	}
}
