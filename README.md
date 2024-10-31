# SG Mod Boilerplate Generator

`sgmodgen` is a CLI tool to generate a boilerplate folder structure for an sg mod plugin in Moodle.

## Installation

To install `sgmodgen`, run:

```bash
npm install -g @schoolgram-by-arbisoft/mod-boilerplate
```

If you prefer not install it globally remove the ```-g ``` flag.

```bash
npm install @schoolgram-by-arbisoft/mod-boilerplate
```
## Usage

### Syntax

You can simply use thee ```sgmodgen``` command. The syntax is as follows: 

```sgmodgen [modname] [readable_name] [target_dir]```

Parameters:
```modname```: The name of the mod plugin e.g sgchasingthief
```readable_name```: The readable name of the plugin used as Title in modform and other places e.g "Chasing The Thief"
```target_dir```: path to the 'mod' folder, can be relative and absolute.

Note: If ```target_dir``` argument is missing, it will create the folder in the current working directory


### Global Install (using -g with npm install)

Simply run the ```sgmodgen``` command in the terminal.

For Example:

```sgmodgen sgelectronconfig "Electron Configuration"  ./mod/```

```sgmodgen sgelectronconfig "Electron Configuration" /Applications/MAMP/htdocs/schoolgram-web/mod/'```


### Local Install (omit -g flag)

If you omit the -g flag, you just need to use npx to run the command. 

For example:

```npx sgmodgen sgelectronconfig "Electron Configuration"  ./mod/```
