#!/bin/sh

#colour1="#c6e48b"
#colour2="#7bc96f"
#colour3="#239a3b"
#colour4="#196127"
colour1="#c68be4"
colour2="#7b6fc9"
colour3="#233b9a"
colour4="#192761"

echo "/* Generated from $0 - do not edit */";

echo > /tmp/get-data-$$
for project in \
    backup \
    cljs-server \
    cognito-javascript \
    docker-guzo-vim \
    dotfiles \
    guzo-dockerfiles \
    guzo-hosting \
    guzo-site \
    holding-page \
    ian-blog \
    jslava \
    jslava-editor \
    jslava-server \
    jslava-ui-vue \
    lambda-blog-post \
    stopwatch
do
    git --git-dir="../${project}/.git" --no-pager log --pretty="format: %ai" >> /tmp/get-data-$$
done

cat /tmp/get-data-$$                                                           | \
    cut -d" " -f2                                                              | \
    sed -e 's/^/#d/'                                                           | \
    sort                                                                       | \
    uniq -c                                                                    | \
    sed -e 's/^ *\([0-9][0-9]*\) *\(.*\)/\2 { background-color: commits\1; }/' | \
    sed -e "s/commits1/$colour1/" \
        -e "s/commits2/$colour2/" \
        -e "s/commits3/$colour2/" \
        -e "s/commits4/$colour3/" \
        -e "s/commits5/$colour3/" \
        -e "s/commits6/$colour4/" \
        -e "s/commits7/$colour4/" \
        -e "s/commits8/$colour4/" \
        -e 's/commits[0-9]/red/'
rm /tmp/get-data-$$
