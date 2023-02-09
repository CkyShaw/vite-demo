import { execSync } from 'child_process'
import fg from 'fast-glob'

const getPackages = packagePath => fg.sync('*', { cwd: packagePath, onlyDirectories: true })

const scopes = [...getPackages('src'), 'docs', 'project', 'core', 'style', 'ci', 'dev', 'deploy', 'other']

const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n')

/* eslint-disable no-implicit-coercion */
const scopeComplete = gitStatus
  .find(r => ~r.indexOf('M  src'))
  ?.replace(/\//g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]

export default {
  rules: {
    /**
     * type[scope]: [function] description
     *      ^^^^^
     */
    'scope-enum': [2, 'always', scopes],
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    'body-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description [No more than 72 characters]
     *      ^^^^^
     */
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    /**
     * type[scope]: [function] description
     * ^^^^
     */
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'release',
        'style',
        'test',
        'improvement'
      ]
    ]
  },
  prompt: {
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
    allowBreakingChanges: [],
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix' },
      {
        value: 'docs',
        name: 'docs:     文档更新 | Documentation only changes'
      },
      {
        value: 'style',
        name: 'style:    代码格式 | Changes that do not affect the meaning of the code'
      },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'
      },
      {
        value: 'perf',
        name: 'perf:     性能提升 | A code change that improves performance'
      },
      {
        value: 'test',
        name: 'test:     测试相关 | Adding missing tests or correcting existing tests'
      },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies'
      },
      {
        value: 'ci',
        name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'
      },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit' },
      {
        value: 'chore',
        name: 'chore:    其他修改 | Other changes that do not modify src or test files'
      }
    ],
    scopes: [
      { value: 'api', name: 'api:                  请求接口' },
      { value: 'assets', name: 'assets:               项目资源' },
      { value: 'components', name: 'components:           组件相关' },
      { value: 'config', name: 'config:               项目配置' },
      { value: 'constants', name: 'constants:            常量配置' },
      { value: 'directives', name: 'directives:           公共指令' },
      { value: 'hooks', name: 'hooks:                公共Composables' },
      { value: 'router', name: 'router:               路由' },
      { value: 'stores', name: 'stores:               状态管理' },
      { value: 'utils', name: 'utils:                工具函数' },
      { value: 'views', name: 'views:                页面模块' },
      { value: 'build', name: 'build:                构建工具链' },
      { value: 'docs', name: 'docs:                 文档相关' },
      { value: 'project', name: 'project:              项目级别改动' }
    ],
    issuePrefixs: [{ value: 'closed', name: 'closed:   标记 ISSUES 已完成' }]
  }
}
