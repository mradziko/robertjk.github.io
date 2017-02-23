# List of all CSS files build using list of all SCSS files in the SRC directory
SRC_DIR=styles/src
TARGET_DIR=styles
TARGETS_ALL=$(shell ls styles/src | sed -e 's/scss/css/g')

all: $(TARGETS_ALL) reset.css
	
%.css: $(SRC_DIR)/%.scss
	sass $< $(TARGET_DIR)/$@

reset.css: $(SRC_DIR)/reset.css
	cp $(SRC_DIR)/$@ $(TARGET_DIR)/$@

watch: reset.css
	sass --watch $(SRC_DIR):$(TARGET_DIR)

clean:
	rm -fr $(TARGET_DIR)/*.css $(TARGET_DIR)/*.css.map .sass-cache/
