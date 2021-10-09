import Vue from 'vue'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Button,
  Table,
  TableColumn,
  Input,
  Divider,
  Row,
  Col,
  Form,
  FormItem,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Upload,
  Image,
  Tabs,
  TabPane,
  Notification,
  Dialog,
  Link,
  Pagination,
  Tag,
  MessageBox
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Divider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Image)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Link)
Vue.use(Pagination)
Vue.use(Tag)

Dialog.props.lockScroll.default = false
Vue.use(Dialog)

Vue.prototype.$notify = Notification
Vue.prototype.$confirm = MessageBox.confirm