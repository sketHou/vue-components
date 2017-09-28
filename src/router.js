import Resume from './pages/portal/resume.vue';
import Tree from './pages/apidoc/tree.vue';

export default {
	routes: [
		{ 
            path: '/resume', 
            component: Resume 
        },
        { 
            path: '/apidoc', 
            component: Tree 
        },
	]
}