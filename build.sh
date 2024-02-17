root=$(dirname "$(readlink -f "$0")")
name=$(basename $root)
version=`jq -r '.version' $root/manifest.json`
zipfile=$root/_dist/$name-$version.zip
cd $root
mkdir -p _dist
zip -r $zipfile . -x "build.sh" -x "*.git*" -x "*_dist*"
cd -
