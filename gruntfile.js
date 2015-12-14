var chalk = require('chalk');
var good = chalk.green("??"),
	bad = chalk.red("?");

var tokens = {
	generated: false
};

module.exports = function(grunt){
	require('time-grunt')(grunt);

	grunt.registerMultiTask('build_standalone_file','Gets all files and builds them', function () {
		var done = this.async();

		setTimeout(function(){
			done();
		},2000);

		this.files.forEach(function (process) {
			grunt.log.subhead("Building " + chalk.cyan(process.orig.dest) + "...");
			
			var files = process.orig.src.filter(function (file) {
				if (file.ignore && file.ignore === true) {
					return false;
				}
				else {
					if (!grunt.file.exists(file.path)) {
						grunt.fail.fatal("  "+bad+ " "+file.path + chalk.red(" not found or does not exist!!!"));
					}
					return true;
				}
			}).map(function(file){
				var fileContent = grunt.file.read(file.path);
				grunt.log.writeln("  " + good + " " + file.path);
				return fileContent;
			}).join('\n');
			
			grunt.file.write(process.orig.dest, files);
			grunt.log.writeln("  Successfully built " + chalk.cyan(process.orig.dest) + " " + chalk.bgYellow.black(":)"));
			done();
		});
	});

	grunt.registerMultiTask('pack','Pack up dem files so they be uber tiny', function(){
		var packer = require('packer');

		var done = this.async();
		var options = this.options({
			license: '',
			version: ''
		});

		setTimeout(function(){
			done();
		},20000);

		this.files.forEach(function(process){
			grunt.log.subhead(chalk.underline("Let the packing begin..."));
			process.src.forEach(function(file){
				grunt.log.writeln(file);
				var src = grunt.file.read(file);
				var packedContent = "/*\n"+options.license+"\n\nVersion: "+options.version+"\n*/\n\n";
				packedContent += packer.pack(src,true);
				grunt.file.write(file,packedContent);
				grunt.log.writeln("  "+good+" "+file);
			});
			done();
		});
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('gruntConfig.json'),
		build_standalone_file: {
			fancy: {
				src: "<%= pkg.files %>",
				dest: "./fancyform/fancyform.js"
			}
		},
		uglify: {
			fancy: {
				files: [{
					"./fancyform/fancyform.min.js": ["./fancyform/fancyform.js"]
				}]
			},
		},
		pack: {
			options: {
				license: "<%= pkg.license %>",
				version: "<%= pkg.version %>"
			},
			fancy: {
				src: "fancyform.min.js"
			}
		},
    less: {
      fancy: {
        files: {
          "./fancyform/fancyform.css": ["./src/less/fancy.less"]
        }
      }
    },
    cssmin: {
      options: {
        advanced:false,
        aggressiveMerging:false,
        rebase:false,
        restructuring:false,
        shorthandCompacting:false
      },
      fancy: {
        files: {
          "./fancyform/fancyform.min.css": ["./fancyform/fancyform.css"]
        }
      }
    },
		clean: {
      files: ["./fancyform/fancyform.css", "./fancyform/fancyform.js"]
    },
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-image-embed');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('dev', ['build_standalone_file:fancy', 'less:fancy']);
	grunt.registerTask('prod', ['dev', 'uglify:fancy', 'cssmin:fancy','clean']);
  
  grunt.registerTask('full', ['dev', 'uglify:fancy', 'cssmin:fancy']);
};
