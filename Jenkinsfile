node("${NodeName}"){
	def errorStage=''
	try{
// 		stage('清理、初始工作目录') {
// 			try{
// 			  dir("$WORKSPACE") {
//           sh 'rm -rf ./*'
//           sh 'mkdir -p ./pro'
//           sh 'mkdir -p ./common'
//           sh 'mkdir -p ./engine'
//           sh 'mkdir -p ./example'
//           sh 'mkdir -p ./management'
//           sh 'mkdir -p ./layout'
//           sh 'mkdir -p ./login'
//           sh 'mkdir -p ./workflow'
//         }
// 			} catch (error) {
// 				errorStage='清理、初始工作目录'
// 				throw error
// 			}
// 		}

		stage('pro项目') {
			try{
				dir("$WORKSPACE/pro") {
          if ("${Pro_BranchName}") {
              def branch = "${Pro_BranchName}".replace('origin/', '')
              git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/sinogear-frontend-pro.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
              sh 'yarn install --registry $NpmRegistry'
          }
        }
			} catch (error) {
				errorStage='Pro项目'
				throw error
			}
		}

		stage('functions模块') {
			try{
				dir("$WORKSPACE/sinogear") {
				if ("${Functions_BranchName}") {
				  def branch = "${Functions_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/sinobest-functions.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinobest-functions/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinobest-functions/lib'
        }
        }
			} catch (error) {
				errorStage='functions模块'
				throw error
			}
		}

		stage('sinogear模块') {
			try{
				dir("$WORKSPACE/sinogear") {
				if ("${SinoGear_BranchName}") {
				  def branch = "${SinoGear_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/sinogear-frontend-frame.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear/lib'
        }
        }
			} catch (error) {
				errorStage='sinogear模块'
				throw error
			}
		}

		stage('common模块') {
			try{
				dir("$WORKSPACE/common") {
				if ("${Common_BranchName}") {
				  def branch = "${Common_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-common.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-common/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-common/lib'
        }
        }
			} catch (error) {
				errorStage='common模块'
				throw error
			}
		}

		stage('engine模块') {
			try{
				dir("$WORKSPACE/engine") {
				if ("${Engine_BranchName}") {
				  def branch = "${Engine_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-engine.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-engine/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-engine/lib'
        }
        }
			} catch (error) {
				errorStage='engine模块'
				throw error
			}
		}

		stage('example模块') {
			try{
				dir("$WORKSPACE/example") {
				if ("${Example_BranchName}") {
				  def branch = "${Example_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-example.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-example/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-example/lib'
        }
        }
			} catch (error) {
				errorStage='example模块'
				throw error
			}
		}

		stage('management模块') {
			try{
				dir("$WORKSPACE/management") {
				if ("${Management_BranchName}") {
				  def branch = "${Management_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-management.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-management/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-management/lib'
        }
        }
			} catch (error) {
				errorStage='management模块'
				throw error
			}
		}

		stage('layout模块') {
			try{
				dir("$WORKSPACE/layout") {
				if ("${Layout_BranchName}") {
				  def branch = "${Layout_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-layout.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-layout/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-layout/lib'
        }
        }
			} catch (error) {
				errorStage='layout模块'
				throw error
			}
		}

		stage('login模块') {
			try{
				dir("$WORKSPACE/login") {
				if ("${Login_BranchName}") {
				  def branch = "${Login_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-login.git', branch: "${branch}", credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-login/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-login/lib'
        }
        }
			} catch (error) {
				errorStage='login模块'
				throw error
			}
		}

		stage('workflow模块') {
			try{
				dir("$WORKSPACE/workflow") {
				if ("${Workflow_BranchName}") {
				  def branch = "${Workflow_BranchName}".replace('origin/', '')
          git([url: 'http://gitlab.ggjs.sinobest.cn/Frontend/react-modules/sinogear-frontend-workflow.git', branch: "${branch}".replace('origin/', ''), credentialsId: '479ed730-683c-41d3-9445-4ecfd497f6ac'])
          sh 'yarn install --registry $NpmRegistry'
          sh 'yarn run compile'
          sh 'rm -rf $WORKSPACE/pro/node_modules/sinogear-module-workflow/lib/*'
          sh 'cp -af ./lib/* $WORKSPACE/pro/node_modules/sinogear-module-workflow/lib'
        }
        }
			} catch (error) {
				errorStage='workflow模块'
				throw error
			}
		}

		stage('构建') {
      try{
        dir("$WORKSPACE/pro") {
        //   sh 'yarn run mock-build'
          sh 'yarn run build-integrate'
        }
      } catch (error) {
        errorStage='构建'
        throw error
      }
    }

    stage('部署') {
      try{
        dir("/data/project/sinogear-frontend-pro") {
          sh 'rm -rf ./integration-2.x'
          sh 'mkdir -p ./integration-2.x'
          sh 'cp -af $WORKSPACE/pro/dist/* ./integration-2.x'

        //   sh 'rm -rf ./special-supply-mock'
        //   sh 'mkdir -p ./special-supply-mock'
        //   sh 'cp -af $WORKSPACE/pro/dist-mock/* ./special-supply-mock'
        //   sh 'cd ./special-supply-mock && yarn install'
        //   sh 'cd ./special-supply-mock && yarn add jszip@3.4.0 --save'
        //   sh 'nohup sb-mock run -p 7001 -t /data/project/sinogear-frontend-pro/special-supply-mock  >> mock_output.log&1 &'
        }
      } catch (error) {
        errorStage='部署'
        throw error
      }
    }

	} catch (error) {
        throw error
	}
}