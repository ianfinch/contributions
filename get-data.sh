#!/bin/sh

echo "/* Generated from $0 - do not edit */";

echo > /tmp/get-data-$$
for project in \
    myproject1 \
    myproject2 \
    myproject3 \
do
    git --git-dir="../${project}/.git" --no-pager log --pretty="format: %ai" >> /tmp/get-data-$$
done

cat /tmp/get-data-$$                                                           | \
    cut -d" " -f2                                                              | \
    sed -e 's/^/#d/'                                                           | \
    sort                                                                       | \
    uniq -c                                                                    | \
    sed -e 's/^ *\([0-9][0-9]*\) *\(.*\)/\2 { background-color: commits\1; }/' | \
    sed -e 's/commits1/#c6e48b/' \
        -e 's/commits2/#7bc96f/' \
        -e 's/commits3/#7bc96f/' \
        -e 's/commits4/#239a3b/' \
        -e 's/commits5/#239a3b/' \
        -e 's/commits6/#196127/' \
        -e 's/commits7/#196127/' \
        -e 's/commits8/#196127/' \
        -e 's/commits[0-9]/red/'
rm /tmp/get-data-$$
